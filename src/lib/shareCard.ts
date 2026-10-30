import { WILD_TYPES } from "@/content/wildTypes";
import type { ArchetypeId } from "@/lib/selfReport/types";

export interface ShareCardInput {
  name: string;
  animal: string;
  slug: string;
  tagline: string;
  archetypeId: ArchetypeId;
  sun: string;
  moon: string;
  dayMaster: string;
}

const WIDTH = 1080;
const HEIGHT = 1350;

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function loadAnimal(slug: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Missing animal art: ${slug}`));
    image.src = `/animals/${slug}.webp`;
  });
}

export async function renderShareCard(input: ShareCardInput): Promise<Blob> {
  await document.fonts.load('700 92px "DM Sans"');
  await document.fonts.load('500 28px "DM Sans"');
  await document.fonts.load('500 22px "IBM Plex Mono"');
  const animal = await loadAnimal(input.slug);
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");

  const type = WILD_TYPES[input.archetypeId];
  if (type.holo) {
    const foil = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    foil.addColorStop(0, "#ffe1f4");
    foil.addColorStop(0.34, "#e7ff8a");
    foil.addColorStop(0.66, "#d7f3ff");
    foil.addColorStop(1, "#ffd0ea");
    ctx.fillStyle = foil;
  } else {
    ctx.fillStyle = type.panel;
  }
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = "#161616";
  ctx.lineWidth = 8;
  ctx.strokeRect(28, 28, WIDTH - 56, HEIGHT - 56);

  ctx.fillStyle = "#161616";
  ctx.textAlign = "center";
  ctx.font = '500 26px "IBM Plex Mono", monospace';
  ctx.fillText("MYWILDIN  ·  YOUR WILDSIGN", 540, 110);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const maxW = 900;
  const maxH = 560;
  const scale = Math.min(maxW / animal.width, maxH / animal.height);
  const artW = animal.width * scale;
  const artH = animal.height * scale;
  const artY = 128;
  ctx.drawImage(animal, (WIDTH - artW) / 2, artY, artW, artH);

  const titleY = Math.min(artY + artH + 78, 760);
  ctx.font = '700 96px "DM Sans", sans-serif';
  ctx.fillText(`The ${input.animal}`, 540, titleY);

  ctx.strokeStyle = "#161616";
  ctx.lineWidth = 2;
  const ruleAfterTitle = titleY + 28;
  ctx.beginPath();
  ctx.moveTo(120, ruleAfterTitle);
  ctx.lineTo(960, ruleAfterTitle);
  ctx.stroke();

  ctx.font = '500 32px "DM Sans", sans-serif';
  const lines = wrap(ctx, input.tagline, 780).slice(0, 3);
  lines.forEach((line, index) => {
    ctx.fillText(line, 540, ruleAfterTitle + 52 + index * 44);
  });

  const rowsTop = ruleAfterTitle + 52 + lines.length * 44 + 16;
  ctx.beginPath();
  ctx.moveTo(120, rowsTop);
  ctx.lineTo(960, rowsTop);
  ctx.stroke();

  const rows: [string, string][] = [
    ["SUN", input.sun],
    ["MOON", input.moon],
    ["DAY MASTER", input.dayMaster],
  ];
  ctx.font = '500 28px "IBM Plex Mono", monospace';
  ctx.textAlign = "left";
  rows.forEach(([label, value], index) => {
    const y = rowsTop + 64 + index * 58;
    ctx.fillText(label, 140, y);
    ctx.textAlign = "right";
    ctx.fillText(value, 940, y);
    ctx.textAlign = "left";
  });

  const ruleY = rowsTop + 64 + rows.length * 58;
  ctx.beginPath();
  ctx.moveTo(120, ruleY);
  ctx.lineTo(960, ruleY);
  ctx.stroke();

  const buttonY = ruleY + 36;
  ctx.strokeRect(340, buttonY, 400, 88);
  ctx.textAlign = "center";
  ctx.font = '700 36px "DM Sans", sans-serif';
  ctx.fillText("Ask Amy", 540, buttonY + 56);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not encode the card");
  return blob;
}

export async function downloadShareCard(input: ShareCardInput): Promise<void> {
  const blob = await renderShareCard(input);
  const filename = `mywildin-${input.slug}-wildsign.png`;
  const file = new File([blob], filename, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `The ${input.animal} · MyWildin`,
        text: `My Wildsign is the ${input.animal}. mywildin.com`,
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
