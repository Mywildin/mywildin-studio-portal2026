# MyWildin 0.1

A know-yourself site for [mywildin.com](https://mywildin.com). You take a short quiz, get one of fifteen animal archetypes, and can save a portrait card. The frame is **friendship** — with yourself, and with your people. It is not a dating product, and there is no chat.

Astrology and BaZi are treated as factory settings: the weather you showed up in, not a verdict.

The public look is off-white, black, DM Sans, and IBM Plex Mono. Each animal has a soft type-color panel. Character art is a transparent WebP at `public/animals/{slug}.webp` (`lion`, `butterfly`, `wolf`, `whale`, `cheetah`, `koala`, `eagle`, `bee`, `fox`, `turtle`, `deer`, `octopus`, `panda`, `owl`, `phoenix`). Replace that file to swap the illustration. `src/components/AnimalArt.tsx` and the share card both load that path.

The result is called a **Wildsign**. **Ask Amy** is the revisit CTA and currently opens the waitlist. Do not use Fate OS, fate, fortune, or psychic in user-facing copy.

## Stack

- React, TypeScript, Vite, Tailwind CSS 4
- Client-only. `npm run build` emits a static `dist/` folder for Netlify.
- [tyme4ts](https://github.com/6tail/tyme4ts) (MIT) for BaZi
- [astronomy-engine](https://github.com/cosinekitty/astronomy) (MIT) for tropical Sun, Moon, and Rising
- Vitest for the scoring and chart tests
- Netlify Forms for the waitlist (no API keys)

Swiss Ephemeris and other GPL/AGPL libraries are not used.

## Scripts

```bash
pnpm install
pnpm test
pnpm run lint
pnpm run build
pnpm dev
```

`pnpm run build` typechecks, then writes `dist/`. Netlify is configured in `netlify.toml` (`publish = "dist"`).

## Architecture

```
src/lib/selfReport/     pure scoring, archetype templates, decision-tree assignment, report
src/lib/astro/          timezone conversion, western chart, BaZi
src/lib/cities.ts       offline city search
src/lib/resultCodec.ts  result snapshot ↔ URL token
src/lib/shareCard.ts    1080×1350 PNG
src/content/            editable copy: questions, animals, trait lines
src/content/constellations.ts
content/blog/           markdown posts
src/data/cities.json    GeoNames cities, population ≥ 15,000
src/pages/              routes
```

The quiz computes everything in the browser. Birth date, time, and place are not sent anywhere. A draft may live in `sessionStorage` until the reading is cast. The result URL (`/result?r=…`) stores the **reading** — nickname, archetype, pillar scores, trait ids, day master, element, Sun, Moon, Rising — and not the birthday.

Routes: `/`, `/quiz`, `/result`, `/about`, `/blog`, `/blog/:slug`, `/privacy`.

## Where content lives

| What you want to change | File |
| --- | --- |
| Question prompts and option wording | `src/content/questions.ts` |
| Animal name, tagline, description, strengths, growth edges | `src/content/archetypes.ts` |
| Pillar blurbs, family blurbs, trait sentences | `src/content/traits.ts` |
| Constellation drawings | `src/content/constellations.ts` |
| Blog posts | `content/blog/*.md` |

Blog posts use frontmatter:

```markdown
---
title: "Title"
description: "One sentence."
date: 2026-10-28
draft: true
---
```

`draft: true` still publishes the post, with a banner. The two posts in the repo are placeholders for the founder to replace.

## How to edit questions

Scoring does **not** key off the visible label. Each option has a stable `id` in both files:

- Labels and glosses: `src/content/questions.ts`
- Scores and trait vectors: `src/lib/selfReport/questions.ts`

You can rewrite a label or gloss freely. Do not rename an option id, and do not reorder ids so the two files disagree. A unit test fails if they drift.

Intensity questions (Q1, Q2, Q3, Q10, Q11) map an id to 1–5. The founder’s scale skips 3 except on Q3. Type questions map an id to a trait vector. Canonical labels from the spec are commented at the top of the scoring file.

## How to edit archetype copy

Change prose in `src/content/archetypes.ts`. The id (`lion_bold_leader`, and so on) is what the scorer returns. The decision tree and the template numbers live in:

- `src/lib/selfReport/assign.ts`
- `src/lib/selfReport/archetypeTemplates.ts`

Leave those alone unless you mean to change the algorithm. Templates keep the founder’s intensity bands and trait patterns so a later compatibility matcher can read them.

## Scoring choices

The founder’s note is the source of truth. A few functions were sketched but not fully defined. 0.1 does this:

1. **`merge_trait_vectors`** takes the max activation when a trait appears twice.
2. **`combine_intensity_and_traits`** divides the 1–5 intensity by 5, then weights every trait by `0.7 + 0.3 * intensity`.
3. **`traits_to_pillar_score`** (cognitive pillar only) was undefined. Intensity is the mean of the three strongest merged traits. Those traits are then weighted with the same formula so every pillar has the same shape.
4. **`get_top_traits`** keeps the top 3 activations above 0. Ties break by trait name, A to Z.
5. The global dominant-trait list is the union of each pillar’s top 3, in pillar order.
6. **Assignment uses the section 6 decision tree**, not the section 5 compatibility score. Section 5 is intentionally not implemented. Profiles and templates are shaped so it can be added later (`pillar_intensities`, `trait_profiles`, `intensity_requirements`, `trait_patterns`).
7. Because of that, the worked example in section 7 (which belongs to the compatibility matcher) lands on **Owl**, not Lion at 92%. The test locks this.
8. **Phoenix** requires every pillar intensity ≥ 0.8 and every required Phoenix trait at a weighted activation ≥ 0.55.
9. The Deer template says `absorptive_learning`. The question bank calls that trait `passive_learning`. Assignment treats them as the same trait. The template string is unchanged.
10. Panda’s template lists `balanced_approach` on the cognitive pillar. That trait actually comes from Q13 (behavior). Stored as written for the future matcher. The decision tree does not read it; Panda is the default when nothing else matches.

Cognitive bars often read high, because each cognitive question fully activates a style. The result page says so and shows the trait words under the bar.

## Charts

- **BaZi** uses tyme4ts on the birthplace’s wall clock. Unknown time: year, month, and day at local noon; hour pillar omitted. The library’s default day boundary is used (23:00–23:59 counts as the next day). Hidden stems are not counted. Dominant element is heavenly-stem weight 1 plus each branch’s main element weight 1. A tie that includes the day master resolves to the day master; otherwise Wood, Fire, Earth, Metal, Water. True solar time is not applied.
- **Western** signs are tropical, from astronomy-engine. Sun longitude is `SunPosition().elon`. Moon longitude is `EclipticGeoMoon().lon`. Rising uses Greenwich apparent sidereal time, the birthplace longitude, true obliquity, and latitude. Unknown time omits Rising. Latitudes inside the polar circles omit Rising too.

Checked charts include Barack Obama (Leo / Gemini / Aquarius), Diana (Cancer / Aquarius / Sagittarius), Steve Jobs (Pisces / Aries / Virgo), and the published four pillars for 29 May 1986 04:00 and 1 January 2000 12:00.

## Cities

`src/data/cities.json` is generated from the GeoNames `cities15000` dump (CC BY 4.0), keeping places with population of at least 50,000 so the quiz stays downloadable. Each row is name, alternate ascii name, country code, English country name, region, latitude, longitude, IANA timezone. If a town is missing, search the nearest larger city. Regenerate with the dump on disk (edit `MIN` in the script if you want a lower cutoff):

```bash
node scripts/prepare-cities.mjs /path/to/cities15000.txt /path/to/admin1CodesASCII.txt
```

Attribution is in the footer. Please keep it if you redistribute the file.

## Waitlist

The form is named `waitlist`. A hidden copy in `index.html` lets Netlify detect it at deploy time. The React form posts `application/x-www-form-urlencoded` to `/` with `form-name=waitlist`. Fields: `name`, `email`, and a honeypot `bot-field`. It works on the deployed site, not against `pnpm dev`.

## Privacy

See `/privacy`. Do not add birth fields to the Netlify form.
