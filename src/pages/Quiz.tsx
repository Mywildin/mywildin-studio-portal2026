import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { CitySearch } from "@/components/CitySearch";
import { Seo } from "@/components/Seo";
import { QUESTION_ORDER } from "@/content/questions";
import { PILLAR_COPY } from "@/content/traits";
import { castBazi } from "@/lib/astro/bazi";
import { resolveBirthMoment } from "@/lib/astro/time";
import { castWesternChart } from "@/lib/astro/western";
import type { City } from "@/lib/cities";
import { encodeResult, type ResultSnapshot } from "@/lib/resultCodec";
import { assessSelfReport } from "@/lib/selfReport";
import { PILLARS, type AnswerMap, type PillarId, type QuestionId } from "@/lib/selfReport/types";

const STORAGE_KEY = "mywildin.quiz.v1";
const TOTAL = 1 + QUESTION_ORDER.length;

interface Draft {
  name: string;
  date: string;
  time: string;
  timeUnknown: boolean;
  city: City | null;
  answers: Partial<Record<QuestionId, string>>;
  step: number;
}

const emptyDraft: Draft = {
  name: "",
  date: "",
  time: "",
  timeUnknown: false,
  city: null,
  answers: {},
  step: 0,
};

function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function loadDraft(): Draft {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyDraft;
    const parsed = JSON.parse(raw) as Draft;
    return { ...emptyDraft, ...parsed, answers: parsed.answers ?? {} };
  } catch {
    return emptyDraft;
  }
}

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export function QuizPage() {
  const [, navigate] = useLocation();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const today = useMemo(() => todayISO(), []);

  useEffect(() => {
    setDraft(loadDraft());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    window.scrollTo({ top: 0 });
  }, [draft, ready]);

  const question = draft.step === 0 ? null : QUESTION_ORDER[draft.step - 1];
  const birthReady =
    draft.name.trim().length > 0 &&
    draft.date >= "1900-01-01" &&
    draft.date <= today &&
    Boolean(draft.city) &&
    (draft.timeUnknown || /^\d{2}:\d{2}$/.test(draft.time));

  function patch(partial: Partial<Draft>) {
    setDraft((current) => ({ ...current, ...partial }));
    setError(null);
  }

  function finish() {
    if (!draft.city) return;
    const answers = draft.answers as AnswerMap;
    try {
      const birth = resolveBirthMoment({
        date: draft.date,
        time: draft.timeUnknown ? null : draft.time,
        timeZone: draft.city.tz,
      });
      const sky = castWesternChart({
        instant: birth.instant,
        latitude: draft.city.lat,
        longitude: draft.city.lon,
        timeKnown: birth.timeKnown,
      });
      const bazi = castBazi(birth.local, birth.timeKnown);
      const assessment = assessSelfReport(answers);
      const pillars = {} as Record<PillarId, number>;
      const pillarTraits = {} as Record<PillarId, string[]>;
      for (const pillar of PILLARS) {
        pillars[pillar] = round4(assessment.profile.pillar_intensities[pillar]);
        pillarTraits[pillar] = assessment.profile.pillars[pillar].dominant_traits;
      }
      const snapshot: ResultSnapshot = {
        v: 1,
        name: draft.name.trim().slice(0, 40),
        archetypeId: assessment.archetypeId,
        pillars,
        dominantTraits: assessment.profile.dominant_traits,
        pillarTraits,
        bazi: {
          dayMasterStem: bazi.dayMasterStem,
          dayMasterPolarity: bazi.dayMasterPolarity,
          dayMasterElement: bazi.dayMasterElement,
          dominantElement: bazi.dominantElement,
          year: bazi.pillars.year,
          month: bazi.pillars.month,
          day: bazi.pillars.day,
          hour: bazi.pillars.hour,
          timeKnown: bazi.timeKnown,
        },
        astro: {
          sun: sky.sun.sign,
          sunDegree: Math.floor(sky.sun.degree),
          moon: sky.moon.sign,
          moonDegree: Math.floor(sky.moon.degree),
          rising: sky.rising?.sign ?? null,
          risingDegree: sky.rising ? Math.floor(sky.rising.degree) : null,
          timeKnown: sky.timeKnown,
        },
      };
      sessionStorage.removeItem(STORAGE_KEY);
      navigate(`/result?r=${encodeResult(snapshot)}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "That didn't compute.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl px-5 py-8">
      <Seo
        title="Get your Wildsign"
        description="Birthday, then fifteen questions. The chart stays on your device."
        path="/quiz"
      />
      <div
        className="h-1 bg-ink/15"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={TOTAL}
        aria-valuenow={draft.step + 1}
        aria-label="Quiz progress"
      >
        <div className="h-full bg-ink" style={{ width: `${((draft.step + 1) / TOTAL) * 100}%` }} />
      </div>
      <p className="mono mt-3 uppercase">
        {draft.step === 0 ? "Birth" : `Question ${draft.step} of ${QUESTION_ORDER.length}`}
      </p>

      {draft.step === 0 ? (
        <form
          className="mt-6 grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (birthReady) patch({ step: 1 });
          }}
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight">First, the sky part.</h1>
            <p className="mt-3 text-sm leading-relaxed">
              Birthday and city. Time if you have it. No time means no rising sign and no hour pillar.
              We don't guess. None of this leaves your phone.
            </p>
          </div>
          <label className="mono grid gap-1 normal-case">
            Name or nickname
            <input
              className="field"
              required
              maxLength={40}
              value={draft.name}
              onChange={(event) => patch({ name: event.target.value })}
              placeholder="Name on the card"
            />
          </label>
          <label className="mono grid gap-1 normal-case">
            Birth date
            <input
              className="field"
              required
              type="date"
              min="1900-01-01"
              max={today}
              value={draft.date}
              onChange={(event) => patch({ date: event.target.value })}
            />
          </label>
          <div className="grid gap-2">
            <label className="mono grid gap-1 normal-case">
              Birth time
              <input
                className="field"
                type="time"
                value={draft.time}
                disabled={draft.timeUnknown}
                onChange={(event) => patch({ time: event.target.value })}
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.timeUnknown}
                onChange={(event) => patch({ timeUnknown: event.target.checked })}
              />
              I don’t know
            </label>
          </div>
          <CitySearch selected={draft.city} onSelect={(city) => patch({ city })} />
          <button
            type="submit"
            disabled={!birthReady}
            className="btn"
          >
            Start the questions
          </button>
        </form>
      ) : question ? (
        <div className="mt-6">
          <p className="mono uppercase">{PILLAR_COPY[question.pillar].title}</p>
          <h1 className="mt-2 text-4xl leading-tight font-bold tracking-tight">{question.prompt}</h1>
          <div className="mt-6 grid gap-3" role="listbox" aria-label={question.prompt}>
            {question.options.map((option) => {
              const selected = draft.answers[question.id] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  className={`border px-4 py-4 text-left ${
                    selected ? "border-ink bg-lime" : "border-ink/30 bg-transparent"
                  }`}
                  onClick={() => patch({ answers: { ...draft.answers, [question.id]: option.id } })}
                >
                  <span className="block font-bold">{option.label}</span>
                  <span className="mt-1 block text-sm">{option.gloss}</span>
                </button>
              );
            })}
          </div>
          {error ? <p className="mt-4 text-sm">{error}</p> : null}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              className="btn btn-line"
              onClick={() => patch({ step: draft.step - 1 })}
            >
              Back
            </button>
            <button
              type="button"
              disabled={!draft.answers[question.id]}
              className="btn"
              onClick={() => {
                if (draft.step === QUESTION_ORDER.length) finish();
                else patch({ step: draft.step + 1 });
              }}
            >
              {draft.step === QUESTION_ORDER.length ? "See your Wildsign" : "Next"}
            </button>
          </div>
        </div>
      ) : null}
      <p className="mono mt-8 normal-case">
        Answers stay on this device until the Wildsign is cast. The link keeps the card, not the birthday.
      </p>
    </div>
  );
}
