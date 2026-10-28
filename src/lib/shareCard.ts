import { CONSTELLATIONS } from "@/content/constellations";
import type { ArchetypeId } from "@/lib/selfReport/types";

export interface ShareCardInput {
  name: string;
  animal: string;
  epithet: string;
  tagline: string;
  archetypeId: ArchetypeId;
  rare: boolean;
  element: string;
  sun: string;
  moon: string;
  rising: string | null;
}

const WIDTH = 1080;
const HEIGHT = 1350;

function hashSeed(value: string): number {
  let seed = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    seed ^= value.charCodeAt(index);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
}

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawConstellation(
  ctx: CanvasRenderingContext2D,
  id: ArchetypeId,
  cx: number,
  cy: number,
  scale: number,
) {
  const figure = CONSTELLATIONS[id];
  const ox = cx - 100 * scale;
  const oy = cy - 120 * scale;
  ctx.save();
  ctx.strokeStyle = id === "phoenix_enigmatic_muse" ? "#f0c27a" : "#d7b56a";
  ctx.fillStyle = ctx.strokeStyle;
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.arc(cx, cy, 78 * scale, 0, Math.PI * 2);
  ctx.stroke();
  for (const [from, to] of figure.links) {
    const a = figure.points[from];
    const b = figure.points[to];
    ctx.beginPath();
    ctx.moveTo(ox + a[0] * scale, oy + a[1] * scale);
    ctx.lineTo(ox + b[0] * scale, oy + b[1] * scale);
    ctx.stroke();
  }
  for (const [x, y] of figure.points) {
    ctx.beginPath();
    ctx.arc(ox + x * scale, oy + y * scale, 3.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export async function renderShareCard(input: ShareCardInput): Promise<Blob> {
  await document.fonts.load('600 92px "Cormorant Garamond"');
  await document.fonts.load('500 28px "Outfit"');
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");

  ctx.fillStyle = "#0c0b10";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const glow = ctx.createRadialGradient(540, 280, 40, 540, 420, 620);
  glow.addColorStop(0, "rgba(215,181,106,0.18)");
  glow.addColorStop(1, "rgba(12,11,16,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const random = mulberry32(hashSeed(input.archetypeId));
  for (let star = 0; star < 70; star += 1) {
    const x = random() * WIDTH;
    const y = random() * HEIGHT;
    ctx.fillStyle = `rgba(244,238,228,${0.25 + random() * 0.55})`;
    ctx.beginPath();
    ctx.arc(x, y, random() > 0.9 ? 1.8 : 1, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(215,181,106,0.85)";
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, WIDTH - 96, HEIGHT - 96);
  ctx.strokeStyle = "rgba(215,181,106,0.35)";
  ctx.strokeRect(64, 64, WIDTH - 128, HEIGHT - 128);

  ctx.fillStyle = "#d7b56a";
  ctx.font = '500 22px Outfit, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("MYWILDIN", 540, 140);
  ctx.fillStyle = "#c9bfb0";
  ctx.font = '300 20px Outfit, sans-serif';
  ctx.fillText("a reading of your factory settings", 540, 174);

  drawConstellation(ctx, input.archetypeId, 540, 390, 1.15);

  if (input.rare) {
    ctx.fillStyle = "#e7a15a";
    ctx.font = '500 18px Outfit, sans-serif';
    ctx.fillText("RARE ARCHETYPE", 540, 560);
  }

  ctx.fillStyle = "#f4eee4";
  ctx.font = '600 92px "Cormorant Garamond", serif';
  ctx.fillText(input.animal, 540, input.rare ? 650 : 620);
  ctx.fillStyle = "#d7b56a";
  ctx.font = '500 italic 36px "Cormorant Garamond", serif';
  ctx.fillText(input.epithet, 540, input.rare ? 710 : 680);
  ctx.fillStyle = "#c9bfb0";
  ctx.font = '400 26px "Cormorant Garamond", serif';
  ctx.fillText(input.tagline, 540, input.rare ? 758 : 732);

  const facts = [
    ["Element", input.element],
    ["Sun", input.sun],
    ["Moon", input.moon],
  ];
  if (input.rising) facts.push(["Rising", input.rising]);
  const gap = 980 / facts.length;
  facts.forEach(([label, value], index) => {
    const x = 80 + gap * index + gap / 2;
    ctx.fillStyle = "#d7b56a";
    ctx.font = '500 16px Outfit, sans-serif';
    ctx.fillText(label.toUpperCase(), x, 860);
    ctx.fillStyle = "#f4eee4";
    ctx.font = '500 32px "Cormorant Garamond", serif';
    ctx.fillText(value, x, 904);
  });

  ctx.strokeStyle = "rgba(215,181,106,0.35)";
  ctx.beginPath();
  ctx.moveTo(180, 960);
  ctx.lineTo(900, 960);
  ctx.stroke();

  ctx.fillStyle = "#c9bfb0";
  ctx.font = '300 22px Outfit, sans-serif';
  ctx.fillText("cast for", 540, 1020);
  ctx.fillStyle = "#f4eee4";
  ctx.font = '500 40px "Cormorant Garamond", serif';
  ctx.fillText(input.name, 540, 1072);

  ctx.fillStyle = "#d7b56a";
  ctx.font = '500 24px Outfit, sans-serif';
  ctx.fillText("mywildin.com", 540, 1220);
  ctx.fillStyle = "#c9bfb0";
  ctx.font = '300 18px Outfit, sans-serif';
  ctx.fillText("Friendship with yourself, and with your people.", 540, 1258);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not encode the card");
  return blob;
}

export async function downloadShareCard(input: ShareCardInput): Promise<void> {
  const blob = await renderShareCard(input);
  const filename = `mywildin-${input.animal.toLowerCase()}.png`;
  const file = new File([blob], filename, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${input.animal} · MyWildin`,
        text: `My wild self is the ${input.animal}. mywildin.com`,
      });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
