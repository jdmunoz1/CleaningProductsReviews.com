/**
 * Generates a vector product illustration for every product in the catalog
 * (plus the author avatar). Each product is drawn as its product type (stick
 * vacuum, spray bottle, detergent jug, mop...) in its brand's colour, so cards
 * read at a glance. These are illustrations, not photos, and are labelled as
 * such. A JPEG copy of each is written next to the SVG for Open Graph and
 * structured data, where SVG is not supported.
 *
 * Run: `npm run images` (tsx scripts/generate-images.mts)
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import sharp from "sharp";
import { products } from "../src/content/products";
import type { Product } from "../src/content/types";

const ROOT = join(process.cwd(), "public");
const W = 1200;
const H = 900;
const GROUND = 770;

/* ------------------------------------------------------------------ colour */

const BRAND_COLORS: Record<string, string> = {
  dyson: "#7d3c98", shark: "#2f6db5", bissell: "#1b5aa6", eureka: "#b71c1c", miele: "#8c1d18",
  hoover: "#1c3f94", irobot: "#3f4a59", roborock: "#2b3340", eufy: "#1e88e5", ridgid: "#e35205",
  "shop-vac": "#e8b400", ryobi: "#a8b800", "rug doctor": "#c8102e", tineco: "#0b7a75", karcher: "#f2b600",
  "sun joe": "#2e8b3a", dawn: "#1565c0", weiman: "#0d47a1", "bar keepers friend": "#c9961a",
  "scrubbing bubbles": "#0077c8", clorox: "#0072ce", method: "#d94f7a", kaboom: "#ef6c00", clr: "#2e7d32",
  "lime-a-way": "#689f38", "better life": "#43a047", "sc johnson": "#d84315", lysol: "#0b4ea2",
  "soft scrub": "#00838f", zep: "#c62828", "nature's miracle": "#6a1b9a", "rocco & roxie": "#00695c",
  folex: "#1565c0", chomchom: "#5e35b1", furemover: "#00897b", "angry orange": "#f57c00",
  febreze: "#0091ea", "simple solution": "#7cb342", "force of nature": "#00796b",
  "seventh generation": "#2e7d32", "branch basics": "#8d6e63", resolve: "#ad1457", "mrs. meyer's": "#5d8a3a",
  blueland: "#1e6fd9", "grove collaborative": "#2f6b4f", "o-cedar": "#c62828", swiffer: "#2e7d32",
  libman: "#d32f2f", casabella: "#00838f", "easy-ology": "#1976d2", "mr. clean": "#1565c0",
  "scotch-brite": "#2e7d32", bona: "#37474f", oxo: "#212121", "e-cloth": "#1e88e5", "scrub daddy": "#f9a825",
  tide: "#f57c00", persil: "#1a3d8f", oxiclean: "#1565c0", affresh: "#0f6cbd", downy: "#5e35b1",
  shout: "#d32f2f", glisten: "#00838f", gain: "#43a047", "arm & hammer": "#e65100", bounce: "#ec407a",
  ecover: "#00897b", dropps: "#1976d2", "easy-off": "#c62828", biokleen: "#388e3c", finish: "#1565c0",
  windex: "#0288d1", sprayway: "#455a64", stoner: "#c62828", pledge: "#f9a825", "old english": "#795548",
};

/** Text printed on the pack when the product line is better known than the parent brand. */
const LABEL_OVERRIDES: Record<string, string> = {
  "drano-max-gel": "Drano",
  "liquid-plumr": "Liquid-Plumr",
  "tilex-mold-mildew": "Tilex",
  "formula-409": "Formula 409",
  "invisible-glass": "Invisible Glass",
  "grove-dish-soap": "Grove",
  "grove-multi-surface-refill": "Grove",
};

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function hex(c: number[]) {
  return "#" + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
}
function mix(a: string, b: string, t: number) {
  const x = rgb(a), y = rgb(b);
  return hex(x.map((v, i) => v + (y[i] - v) * t));
}
function luminance(c: string) {
  const [r, g, b] = rgb(c).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

interface Pal { c: string; light: string; tint: string; dark: string; on: string }

function palette(p: Product): Pal {
  let c = BRAND_COLORS[p.brand.toLowerCase()] ?? "#3b6e8f";
  if (p.slug === "bissell-little-green") c = "#2e9b48";
  return {
    c,
    light: mix(c, "#ffffff", 0.35),
    tint: mix(c, "#ffffff", 0.88),
    dark: mix(c, "#000000", 0.35),
    on: luminance(c) > 0.42 ? "#1f2430" : "#ffffff",
  };
}

/* ------------------------------------------------------------------ helpers */

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Brand text sized to fit a box width. */
function brandText(x: number, y: number, maxW: number, maxSize: number, text: string, fill: string, rotate = 0) {
  const size = Math.min(maxSize, (maxW * 0.92) / (text.length * 0.6));
  const tr = rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : "";
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${size.toFixed(1)}" fill="${fill}"${tr}>${esc(text)}</text>`;
}

/** White pack label with brand name and a brand-colour rule. */
function packLabel(x: number, y: number, w: number, h: number, text: string, pal: Pal) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#ffffff" opacity="0.96"/>
  <rect x="${x + 18}" y="${y + h - 34}" width="${w - 36}" height="8" rx="4" fill="${pal.c}" opacity="0.85"/>
  <rect x="${x + 18}" y="${y + h - 54}" width="${(w - 36) * 0.6}" height="6" rx="3" fill="${pal.c}" opacity="0.35"/>
  ${labelText(x + w / 2, y + (h - 60) / 2 + 6, w - 24, 56, text, pal.c)}`;
}

/** Like brandText, but long multi-word names wrap onto two lines instead of shrinking. */
function labelText(x: number, y: number, maxW: number, maxSize: number, text: string, fill: string) {
  const words = text.split(" ");
  if (text.length <= 11 || words.length < 2) return brandText(x, y, maxW, maxSize, text, fill);
  let best = 1;
  for (let i = 1; i < words.length; i++) {
    const d = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (d < Math.abs(words.slice(0, best).join(" ").length - words.slice(best).join(" ").length)) best = i;
  }
  let lines = [words.slice(0, best).join(" "), words.slice(best).join(" ")];
  const fit = (ls: string[]) => Math.min(maxSize, (maxW * 0.92) / (Math.max(...ls.map((l) => l.length)) * 0.6));
  if (words.length >= 3 && fit(lines) < 30) lines = words;
  const size = fit(lines);
  return lines.map((l, i) => brandText(x, y + (i - (lines.length - 1) / 2) * size * 1.1, maxW, size, l, fill)).join("");
}

function shadow(rx: number, cx = 600) {
  return `<ellipse cx="${cx}" cy="${GROUND + 6}" rx="${rx}" ry="${Math.max(14, rx * 0.09)}" fill="#0f172a" opacity="0.13"/>`;
}

function wheel(cx: number, cy: number, r: number) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#g-dark)"/><circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="#9ca3af"/>`;
}

function defs(pal: Pal) {
  return `<defs>
    <linearGradient id="g-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#eef2f6"/></linearGradient>
    <radialGradient id="g-halo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${pal.tint}"/><stop offset="1" stop-color="${pal.tint}" stop-opacity="0"/></radialGradient>
    <linearGradient id="g-body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${pal.light}"/><stop offset="0.45" stop-color="${pal.c}"/><stop offset="1" stop-color="${pal.dark}"/></linearGradient>
    <linearGradient id="g-plastic" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fbfbfc"/><stop offset="0.5" stop-color="#eceef1"/><stop offset="1" stop-color="#c9ced6"/></linearGradient>
    <linearGradient id="g-dark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4b5563"/><stop offset="1" stop-color="#1f2937"/></linearGradient>
    <linearGradient id="g-metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f3f4f6"/><stop offset="0.5" stop-color="#a7adb7"/><stop offset="1" stop-color="#d7dbe0"/></linearGradient>
    <linearGradient id="g-clear" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="1" stop-color="${pal.tint}" stop-opacity="0.55"/></linearGradient>
    <linearGradient id="g-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc4ec" stop-opacity="0.75"/><stop offset="1" stop-color="#2f8fcf" stop-opacity="0.85"/></linearGradient>
    <linearGradient id="g-shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0.35"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
  </defs>`;
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ------------------------------------------------------------- archetypes */

type Draw = (pal: Pal, label: string) => string;

const sprayBottle: Draw = (pal, label) => `${shadow(150)}
  <path d="M480 420 Q480 350 548 340 L548 300 L652 300 L652 340 Q720 350 720 420 L720 740 Q720 765 695 765 L505 765 Q480 765 480 740 Z" fill="url(#g-body)"/>
  <rect x="492" y="430" width="36" height="300" rx="18" fill="url(#g-shine)"/>
  ${packLabel(502, 470, 196, 200, label, pal)}
  <rect x="540" y="268" width="120" height="40" rx="8" fill="url(#g-plastic)"/>
  <path d="M520 190 L668 190 Q690 190 690 212 L690 268 L520 268 Z" fill="url(#g-plastic)"/>
  <rect x="452" y="206" width="76" height="30" rx="6" fill="#d6dae0"/>
  <path d="M560 268 Q548 320 536 372 L566 376 Q578 320 594 268 Z" fill="#cfd4db"/>`;

const aerosol: Draw = (pal, label) => `${shadow(120)}
  <rect x="510" y="330" width="180" height="435" rx="18" fill="url(#g-body)"/>
  <rect x="522" y="345" width="28" height="400" rx="14" fill="url(#g-shine)"/>
  <path d="M510 350 Q600 290 690 350 Z" fill="url(#g-metal)"/>
  <path d="M528 330 L528 250 Q528 220 558 220 L642 220 Q672 220 672 250 L672 330 Z" fill="url(#g-plastic)"/>
  <rect x="586" y="206" width="28" height="18" rx="4" fill="#9ca3af"/>
  ${packLabel(522, 470, 156, 190, label, pal)}`;

const jug: Draw = (pal, label) => `${shadow(190)}
  <path d="M430 360 Q430 300 490 300 L700 300 Q770 300 770 370 L770 735 Q770 765 740 765 L460 765 Q430 765 430 735 Z" fill="url(#g-body)"/>
  <path d="M650 318 L742 318 Q752 318 752 330 L752 450 Q752 462 740 462 L688 462 Q676 462 676 450 L676 360 Q676 344 660 344 L650 344 Z" fill="#f8fafc" opacity="0.92"/>
  <rect x="455" y="250" width="110" height="60" rx="10" fill="url(#g-plastic)"/>
  <rect x="444" y="380" width="30" height="360" rx="15" fill="url(#g-shine)"/>
  ${packLabel(470, 490, 260, 220, label, pal)}`;

const squeezeBottle: Draw = (pal, label) => `${shadow(120)}
  <path d="M520 360 Q520 300 570 290 L570 255 L630 255 L630 290 Q680 300 680 360 L680 735 Q680 765 650 765 L550 765 Q520 765 520 735 Z" fill="url(#g-body)"/>
  <rect x="532" y="370" width="26" height="370" rx="13" fill="url(#g-shine)"/>
  <rect x="560" y="200" width="80" height="62" rx="12" fill="url(#g-plastic)"/>
  <rect x="582" y="186" width="36" height="20" rx="6" fill="#cfd4db"/>
  ${packLabel(532, 450, 136, 210, label, pal)}`;

const toiletBottle: Draw = (pal, label) => `${shadow(140)}
  <path d="M500 420 Q500 360 560 350 L640 350 Q700 360 700 420 L700 735 Q700 765 670 765 L530 765 Q500 765 500 735 Z" fill="url(#g-body)"/>
  <path d="M572 352 L572 300 Q572 268 548 246 L496 200" stroke="${pal.c}" stroke-width="46" stroke-linecap="round" fill="none"/>
  <path d="M572 352 L572 300 Q572 268 548 246 L496 200" stroke="#ffffff" stroke-opacity="0.25" stroke-width="12" stroke-linecap="round" fill="none"/>
  <circle cx="488" cy="192" r="24" fill="url(#g-plastic)"/>
  <rect x="512" y="430" width="28" height="310" rx="14" fill="url(#g-shine)"/>
  ${packLabel(518, 480, 164, 200, label, pal)}`;

const powderCan: Draw = (pal, label) => `${shadow(130)}
  <rect x="490" y="330" width="220" height="435" rx="14" fill="url(#g-body)"/>
  <rect x="504" y="345" width="30" height="400" rx="15" fill="url(#g-shine)"/>
  <ellipse cx="600" cy="330" rx="112" ry="26" fill="url(#g-metal)"/>
  <ellipse cx="600" cy="326" rx="96" ry="18" fill="#e5e7eb"/>
  ${[560, 585, 610, 635].map((x) => `<circle cx="${x}" cy="326" r="5" fill="#6b7280"/>`).join("")}
  ${packLabel(508, 450, 184, 220, label, pal)}`;

const pen: Draw = (pal, label) => `${shadow(80)}
  <rect x="560" y="300" width="80" height="465" rx="40" fill="url(#g-body)"/>
  <rect x="572" y="320" width="16" height="420" rx="8" fill="url(#g-shine)"/>
  <rect x="566" y="200" width="68" height="120" rx="30" fill="url(#g-plastic)"/>
  <rect x="566" y="300" width="68" height="14" fill="#cfd4db"/>
  ${brandText(600, 560, 380, 50, label, pal.on, -90)}`;

const wipesCanister: Draw = (pal, label) => `${shadow(150)}
  <rect x="475" y="400" width="250" height="365" rx="22" fill="url(#g-body)"/>
  <rect x="490" y="415" width="30" height="330" rx="15" fill="url(#g-shine)"/>
  <rect x="462" y="352" width="276" height="62" rx="18" fill="url(#g-plastic)"/>
  <path d="M590 352 Q560 300 600 270 Q640 240 610 200 Q650 230 650 270 Q648 320 616 352 Z" fill="#ffffff" stroke="#dfe3e8" stroke-width="3"/>
  ${packLabel(495, 480, 210, 220, label, pal)}`;

const pouch: Draw = (pal, label) => `${shadow(220, 620)}
  <path d="M460 290 L700 290 L716 700 Q718 765 660 765 L500 765 Q442 765 444 700 Z" fill="url(#g-body)"/>
  <rect x="460" y="290" width="240" height="34" fill="${pal.dark}" opacity="0.35"/>
  <rect x="476" y="340" width="26" height="380" rx="13" fill="url(#g-shine)"/>
  ${packLabel(488, 400, 184, 210, label, pal)}
  ${[[760, 742], [830, 742], [795, 700]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="36" ry="24" fill="#ffffff" stroke="#d7dce3" stroke-width="3"/><ellipse cx="${x}" cy="${y - 4}" rx="22" ry="10" fill="${pal.tint}"/>`).join("")}`;

const tub: Draw = (pal, label) => `${shadow(240, 620)}
  <path d="M430 470 L770 470 L752 740 Q750 765 724 765 L476 765 Q450 765 448 740 Z" fill="url(#g-body)"/>
  <rect x="418" y="430" width="364" height="56" rx="16" fill="url(#g-plastic)"/>
  <rect x="456" y="500" width="26" height="240" rx="13" fill="url(#g-shine)"/>
  ${packLabel(490, 510, 220, 200, label, pal)}
  ${[[810, 742], [870, 748], [840, 706]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="26" fill="${pal.light}" stroke="${pal.dark}" stroke-opacity="0.3" stroke-width="3"/><ellipse cx="${x - 8}" cy="${y - 8}" rx="10" ry="6" fill="#ffffff" opacity="0.6"/>`).join("")}`;

const box: Draw = (pal, label) => `${shadow(210, 620)}
  <path d="M700 330 L780 290 L780 725 L700 765 Z" fill="${pal.dark}"/>
  <path d="M440 330 L520 290 L780 290 L700 330 Z" fill="${pal.light}"/>
  <rect x="440" y="330" width="260" height="435" fill="url(#g-body)"/>
  ${packLabel(462, 420, 216, 230, label, pal)}`;

const stickVac: Draw = (pal, label) => `${shadow(170, 610)}
  <rect x="470" y="712" width="250" height="56" rx="24" fill="url(#g-dark)"/>
  <rect x="490" y="718" width="210" height="12" rx="6" fill="${pal.c}"/>
  <rect x="590" y="360" width="22" height="360" rx="8" fill="url(#g-metal)"/>
  <rect x="560" y="200" width="110" height="190" rx="40" fill="url(#g-clear)" stroke="#cbd5e1" stroke-width="3"/>
  <circle cx="640" cy="200" r="58" fill="url(#g-body)"/>
  <circle cx="640" cy="200" r="22" fill="${pal.dark}"/>
  <path d="M660 160 Q730 110 760 170 L760 270 Q760 300 732 300 L690 300" stroke="url(#g-body)" stroke-width="30" fill="none" stroke-linecap="round"/>
  <rect x="690" y="270" width="70" height="90" rx="14" fill="url(#g-dark)"/>
  ${brandText(615, 300, 90, 30, label, pal.c)}`;

const upright: Draw = (pal, label) => `${shadow(210)}
  <rect x="420" y="680" width="360" height="80" rx="30" fill="url(#g-dark)"/>
  <rect x="440" y="690" width="320" height="14" rx="7" fill="${pal.c}"/>
  ${wheel(460, 754, 22)}${wheel(740, 754, 22)}
  <rect x="580" y="140" width="40" height="230" rx="12" fill="url(#g-plastic)"/>
  <rect x="550" y="110" width="100" height="48" rx="22" fill="url(#g-dark)"/>
  <rect x="510" y="330" width="180" height="370" rx="50" fill="url(#g-body)"/>
  <rect x="540" y="380" width="120" height="190" rx="40" fill="url(#g-clear)" stroke="#cbd5e1" stroke-width="3"/>
  <path d="M552 520 Q600 500 648 520 L648 535 Q648 562 620 562 L580 562 Q552 562 552 535 Z" fill="#9ca3af" opacity="0.55"/>
  ${brandText(600, 625, 150, 36, label, pal.on)}`;

const canister: Draw = (pal, label) => `${shadow(330, 640)}
  <path d="M520 600 Q560 420 700 340" stroke="url(#g-dark)" stroke-width="28" fill="none" stroke-linecap="round"/>
  <path d="M700 340 L850 735" stroke="url(#g-metal)" stroke-width="20" stroke-linecap="round"/>
  <rect x="790" y="728" width="160" height="40" rx="16" fill="url(#g-dark)"/>
  <path d="M300 690 Q300 520 470 520 Q620 520 620 650 L620 700 Q620 765 560 765 L360 765 Q300 765 300 700 Z" fill="url(#g-body)"/>
  <ellipse cx="420" cy="580" rx="70" ry="26" fill="#ffffff" opacity="0.25"/>
  ${wheel(570, 735, 36)}
  ${brandText(440, 680, 200, 40, label, pal.on)}`;

const robot: Draw = (pal, label) => `${shadow(300)}
  <ellipse cx="600" cy="700" rx="290" ry="80" fill="url(#g-dark)"/>
  <rect x="310" y="640" width="580" height="60" fill="url(#g-dark)"/>
  <ellipse cx="600" cy="640" rx="290" ry="80" fill="url(#g-body)"/>
  <ellipse cx="600" cy="632" rx="240" ry="62" fill="#ffffff" opacity="0.08"/>
  <rect x="538" y="574" width="124" height="22" fill="url(#g-dark)"/>
  <ellipse cx="600" cy="596" rx="62" ry="20" fill="url(#g-dark)"/>
  <ellipse cx="600" cy="574" rx="62" ry="20" fill="#4b5563"/>
  <ellipse cx="600" cy="668" rx="34" ry="12" fill="#ffffff" opacity="0.85"/>
  ${brandText(600, 718, 220, 30, label, "#e5e7eb")}`;

const shopVac: Draw = (pal, label) => `${shadow(210, 620)}
  <path d="M470 520 Q340 540 340 660 Q340 740 420 750" stroke="url(#g-dark)" stroke-width="30" fill="none" stroke-linecap="round"/>
  <rect x="400" y="742" width="120" height="26" rx="10" fill="#374151"/>
  <rect x="470" y="420" width="290" height="320" rx="34" fill="url(#g-body)"/>
  <rect x="488" y="440" width="30" height="280" rx="15" fill="url(#g-shine)"/>
  <rect x="450" y="340" width="330" height="96" rx="44" fill="url(#g-dark)"/>
  <path d="M560 340 Q615 270 670 340" stroke="#374151" stroke-width="22" fill="none" stroke-linecap="round"/>
  ${wheel(500, 752, 18)}${wheel(730, 752, 18)}
  ${brandText(615, 560, 250, 46, label, pal.on)}`;

const carpetCleaner: Draw = (pal, label) => `${shadow(220)}
  <rect x="410" y="676" width="380" height="88" rx="30" fill="url(#g-body)"/>
  <rect x="430" y="740" width="340" height="18" rx="6" fill="#1f2937"/>
  ${wheel(450, 756, 20)}${wheel(750, 756, 20)}
  <rect x="580" y="130" width="40" height="230" rx="12" fill="url(#g-plastic)"/>
  <rect x="548" y="100" width="104" height="48" rx="22" fill="url(#g-dark)"/>
  <rect x="500" y="330" width="200" height="370" rx="44" fill="url(#g-plastic)"/>
  <rect x="520" y="350" width="160" height="150" rx="30" fill="url(#g-water)"/>
  <rect x="520" y="520" width="160" height="140" rx="30" fill="url(#g-clear)" stroke="#cbd5e1" stroke-width="3"/>
  <path d="M532 610 Q600 595 668 610 L668 630 Q668 650 640 650 L560 650 Q532 650 532 630 Z" fill="#8b7d6b" opacity="0.55"/>
  ${brandText(600, 718, 300, 36, label, pal.on)}`;

const spotCleaner: Draw = (pal, label) => `${shadow(220, 610)}
  <path d="M480 470 Q520 380 600 380 Q680 380 720 470" stroke="url(#g-dark)" stroke-width="30" fill="none" stroke-linecap="round"/>
  <rect x="460" y="460" width="280" height="305" rx="40" fill="url(#g-body)"/>
  <rect x="480" y="480" width="110" height="160" rx="26" fill="url(#g-water)"/>
  <rect x="476" y="478" width="26" height="270" rx="13" fill="url(#g-shine)"/>
  <circle cx="800" cy="640" r="70" fill="none" stroke="#374151" stroke-width="18"/>
  <circle cx="800" cy="640" r="44" fill="none" stroke="#4b5563" stroke-width="16"/>
  <rect x="770" y="720" width="90" height="46" rx="12" fill="url(#g-plastic)"/>
  ${brandText(600, 690, 240, 38, label, pal.on)}`;

const steamMop: Draw = (pal, label) => `${shadow(160)}
  <path d="M470 765 L730 765 L680 700 L520 700 Z" fill="url(#g-dark)"/>
  <rect x="460" y="752" width="280" height="16" rx="6" fill="#f3f4f6"/>
  <rect x="588" y="110" width="24" height="600" rx="10" fill="url(#g-metal)"/>
  <rect x="560" y="90" width="80" height="44" rx="20" fill="url(#g-dark)"/>
  <rect x="550" y="360" width="100" height="270" rx="36" fill="url(#g-body)"/>
  <rect x="566" y="390" width="68" height="120" rx="24" fill="url(#g-water)"/>
  ${brandText(600, 570, 110, 26, label, pal.on)}`;

const handheldSteam: Draw = (pal, label) => `${shadow(190, 620)}
  <path d="M520 560 L380 520" stroke="url(#g-dark)" stroke-width="34" stroke-linecap="round"/>
  <rect x="330" y="500" width="70" height="40" rx="10" fill="url(#g-plastic)"/>
  <path d="M560 470 Q560 400 640 400 Q720 400 720 470" stroke="url(#g-dark)" stroke-width="34" fill="none" stroke-linecap="round"/>
  <rect x="500" y="460" width="260" height="305" rx="50" fill="url(#g-body)"/>
  <rect x="520" y="490" width="80" height="150" rx="24" fill="url(#g-water)"/>
  <rect x="516" y="480" width="24" height="260" rx="12" fill="url(#g-shine)"/>
  ${brandText(660, 690, 180, 34, label, pal.on)}`;

const floorWetDry: Draw = (pal, label) => `${shadow(190)}
  <rect x="440" y="690" width="320" height="76" rx="30" fill="url(#g-dark)"/>
  <rect x="452" y="738" width="296" height="28" rx="14" fill="#e5e7eb"/>
  <rect x="580" y="110" width="40" height="300" rx="14" fill="url(#g-plastic)"/>
  <rect x="550" y="90" width="100" height="44" rx="20" fill="url(#g-dark)"/>
  <rect x="530" y="360" width="140" height="350" rx="44" fill="url(#g-body)"/>
  <rect x="548" y="390" width="104" height="120" rx="26" fill="url(#g-water)"/>
  <rect x="548" y="530" width="104" height="110" rx="26" fill="url(#g-clear)" stroke="#cbd5e1" stroke-width="3"/>
  ${brandText(600, 672, 120, 28, label, pal.on)}`;

const pressureWasher: Draw = (pal, label) => `${shadow(230, 620)}
  <circle cx="380" cy="560" r="80" fill="none" stroke="#1f2937" stroke-width="14"/>
  <circle cx="380" cy="560" r="56" fill="none" stroke="#374151" stroke-width="12"/>
  <path d="M440 600 Q460 700 500 720" stroke="#1f2937" stroke-width="12" fill="none"/>
  <rect x="640" y="190" width="24" height="220" rx="10" fill="url(#g-dark)"/>
  <rect x="610" y="180" width="110" height="34" rx="16" fill="url(#g-dark)"/>
  <rect x="470" y="380" width="260" height="350" rx="40" fill="url(#g-body)"/>
  <rect x="486" y="400" width="26" height="310" rx="13" fill="url(#g-shine)"/>
  <rect x="510" y="440" width="120" height="70" rx="14" fill="url(#g-dark)"/>
  ${wheel(700, 728, 42)}
  <rect x="470" y="740" width="40" height="28" rx="6" fill="#374151"/>
  <path d="M800 300 L860 760" stroke="url(#g-metal)" stroke-width="12" stroke-linecap="round"/>
  <path d="M780 280 L840 280 L830 340 L800 340 Z" fill="url(#g-dark)"/>
  ${brandText(600, 620, 230, 46, label, pal.on)}`;

const spinMop: Draw = (pal, label) => `${shadow(210)}
  <path d="M640 520 L700 120" stroke="url(#g-metal)" stroke-width="22" stroke-linecap="round"/>
  <rect x="684" y="96" width="40" height="80" rx="16" fill="${pal.c}" transform="rotate(8 704 136)"/>
  <path d="M430 520 L770 520 L740 750 Q736 765 716 765 L484 765 Q464 765 460 750 Z" fill="url(#g-body)"/>
  <ellipse cx="600" cy="520" rx="170" ry="30" fill="${pal.dark}"/>
  <ellipse cx="640" cy="514" rx="96" ry="20" fill="#f1f5f9"/>
  ${range(9).map((i) => `<path d="M${560 + i * 10} 512 q-6 10 0 18" stroke="#cbd5e1" stroke-width="5" fill="none"/>`).join("")}
  <rect x="452" y="540" width="26" height="200" rx="13" fill="url(#g-shine)"/>
  ${brandText(600, 650, 240, 46, label, pal.on)}`;

const sprayMop: Draw = (pal, label) => `${shadow(200)}
  <rect x="420" y="726" width="360" height="42" rx="16" fill="url(#g-dark)"/>
  <rect x="420" y="752" width="360" height="16" rx="6" fill="#f3f4f6"/>
  <rect x="588" y="110" width="24" height="620" rx="10" fill="url(#g-metal)"/>
  <rect x="556" y="90" width="88" height="46" rx="20" fill="url(#g-dark)"/>
  <rect x="612" y="140" width="22" height="40" rx="6" fill="${pal.c}"/>
  <rect x="610" y="380" width="80" height="190" rx="28" fill="url(#g-body)"/>
  ${brandText(650, 476, 170, 26, label, pal.on, -90)}`;

const cottonMop: Draw = (pal, label) => `${shadow(170)}
  <rect x="588" y="100" width="24" height="560" rx="10" fill="url(#g-body)"/>
  <rect x="578" y="96" width="44" height="40" rx="14" fill="url(#g-dark)"/>
  <rect x="566" y="630" width="68" height="44" rx="10" fill="url(#g-plastic)"/>
  ${range(15).map((i) => { const x = 470 + i * 18.5; return `<path d="M${600 + (i - 7) * 4} 668 Q${x + 10} 720 ${x} 766" stroke="${i % 2 ? "#f5f1e8" : "#e8e1d0"}" stroke-width="14" fill="none" stroke-linecap="round"/>`; }).join("")}
  <rect x="470" y="300" width="96" height="44" rx="10" fill="#ffffff"/>
  ${brandText(518, 322, 86, 22, label, pal.c)}`;

const sweeper: Draw = (pal, label) => `${shadow(200)}
  <rect x="430" y="728" width="340" height="40" rx="14" fill="url(#g-body)"/>
  <rect x="430" y="756" width="340" height="12" rx="5" fill="#f3f4f6"/>
  <rect x="560" y="706" width="80" height="26" rx="10" fill="url(#g-dark)"/>
  <rect x="590" y="110" width="20" height="600" rx="9" fill="url(#g-metal)"/>
  <rect x="580" y="96" width="40" height="160" rx="18" fill="url(#g-body)"/>
  ${brandText(600, 748, 300, 24, label, pal.on)}`;

const broom: Draw = (pal, label) => `${shadow(260, 640)}
  <path d="M560 560 L470 100" stroke="url(#g-body)" stroke-width="22" stroke-linecap="round"/>
  <path d="M440 560 L640 560 L700 760 L400 760 Z" fill="${pal.c}"/>
  <rect x="440" y="540" width="200" height="40" rx="10" fill="url(#g-dark)"/>
  ${range(14).map((i) => `<line x1="${448 + i * 14}" y1="580" x2="${408 + i * 22}" y2="758" stroke="${pal.dark}" stroke-width="3" opacity="0.6"/>`).join("")}
  <path d="M740 760 L760 640 L900 640 L930 760 Z" fill="url(#g-dark)"/>
  <rect x="800" y="560" width="40" height="90" rx="10" fill="url(#g-dark)"/>
  ${brandText(540, 560, 180, 24, label, "#ffffff")}`;

const duster: Draw = (pal, label) => `${shadow(150)}
  <rect x="588" y="430" width="24" height="330" rx="10" fill="url(#g-body)"/>
  <rect x="576" y="640" width="48" height="126" rx="18" fill="url(#g-body)"/>
  ${range(22).map((i) => { const a = (i / 22) * Math.PI * 2; const x = 600 + Math.cos(a) * 90; const y = 300 + Math.sin(a) * 130; return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="46" ry="34" fill="${i % 2 ? pal.tint : "#ffffff"}" stroke="#e2e8f0" stroke-width="2"/>`; }).join("")}
  <ellipse cx="600" cy="300" rx="90" ry="130" fill="${pal.tint}"/>
  <rect x="660" y="660" width="150" height="56" rx="12" fill="#ffffff"/>
  ${brandText(735, 688, 136, 30, label, pal.c)}`;

const cloths: Draw = (pal, label) => `${shadow(240)}
  <rect x="380" y="700" width="440" height="66" rx="20" fill="${pal.dark}"/>
  <rect x="394" y="648" width="440" height="62" rx="20" fill="${pal.c}"/>
  <rect x="408" y="596" width="440" height="62" rx="20" fill="${pal.light}"/>
  ${range(30).map((i) => `<circle cx="${430 + (i % 15) * 26}" cy="${614 + Math.floor(i / 15) * 22}" r="2.5" fill="#ffffff" opacity="0.4"/>`).join("")}
  <rect x="520" y="440" width="200" height="110" rx="14" fill="#ffffff"/>
  ${brandText(620, 495, 180, 44, label, pal.c)}`;

const eraser: Draw = (pal, label) => `${shadow(190)}
  <path d="M440 560 L520 500 L800 500 L720 560 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
  <path d="M720 560 L800 500 L800 700 L720 765 Z" fill="#e2e8f0"/>
  <rect x="440" y="560" width="280" height="205" fill="#f8fafc" stroke="#e2e8f0" stroke-width="3"/>
  ${range(40).map((i) => `<circle cx="${455 + ((i * 37) % 250)}" cy="${575 + ((i * 53) % 180)}" r="2" fill="#cbd5e1"/>`).join("")}
  <rect x="470" y="380" width="240" height="80" rx="12" fill="${pal.c}"/>
  ${brandText(590, 420, 220, 40, label, pal.on)}`;

const scourPads: Draw = (pal, label) => `${shadow(220)}
  ${[0, 1, 2].map((i) => `<rect x="${410 + i * 20}" y="${690 - i * 56}" width="360" height="70" rx="14" fill="${["#267a31", "#3aa346", "#2f8f3a"][i]}"/>`).join("")}
  ${range(40).map((i) => `<path d="M${460 + (i % 20) * 16} ${590 + Math.floor(i / 20) * 26} l8 6" stroke="#1b5e20" stroke-width="3"/>`).join("")}
  <rect x="490" y="420" width="240" height="96" rx="14" fill="#ffffff"/>
  ${brandText(610, 468, 220, 40, label, pal.c)}`;

const sponge: Draw = (pal, label) => `${shadow(200)}
  <ellipse cx="600" cy="640" rx="200" ry="130" fill="${pal.dark}"/>
  <ellipse cx="600" cy="620" rx="200" ry="130" fill="${pal.c}"/>
  <ellipse cx="560" cy="580" rx="110" ry="50" fill="#ffffff" opacity="0.2"/>
  ${range(26).map((i) => `<circle cx="${450 + ((i * 41) % 300)}" cy="${540 + ((i * 29) % 150)}" r="5" fill="${pal.dark}" opacity="0.35"/>`).join("")}
  <rect x="480" y="330" width="240" height="96" rx="14" fill="#ffffff"/>
  ${brandText(600, 378, 220, 42, label, pal.c)}`;

const roller: Draw = (pal, label) => `${shadow(200)}
  <path d="M600 470 L600 300 Q600 260 640 250 L700 236" stroke="url(#g-dark)" stroke-width="40" fill="none" stroke-linecap="round"/>
  <rect x="440" y="470" width="320" height="200" rx="60" fill="url(#g-body)"/>
  <rect x="460" y="610" width="280" height="80" rx="40" fill="#e5e7eb"/>
  ${range(16).map((i) => `<line x1="${480 + i * 16}" y1="618" x2="${476 + i * 16}" y2="684" stroke="#9ca3af" stroke-width="3"/>`).join("")}
  ${brandText(600, 540, 280, 46, label, pal.on)}`;

const rubberBrush: Draw = (pal, label) => `${shadow(240, 600)}
  <rect x="589" y="90" width="22" height="470" rx="11" fill="url(#g-metal)"/>
  <rect x="420" y="540" width="360" height="70" rx="16" fill="url(#g-body)"/>
  ${range(22).map((i) => `<rect x="${428 + i * 16}" y="606" width="10" height="160" rx="5" fill="${pal.dark}"/>`).join("")}
  ${brandText(600, 576, 320, 34, label, pal.on)}`;

/* ---------------------------------------------------------------- mapping */

const BY_CATEGORY: Record<string, Draw> = {
  "cordless-vacuums": stickVac,
  "upright-vacuums": upright,
  "canister-vacuums": canister,
  "robot-vacuums": robot,
  "wetdry-vacuums": shopVac,
  "carpet-cleaners": carpetCleaner,
  "spot-cleaners": spotCleaner,
  "steam-mops": steamMop,
  "floor-scrubbers": floorWetDry,
  "pressure-washers": pressureWasher,
  brooms: broom,
  dusters: duster,
  "microfiber-cloths": cloths,
  detergents: jug,
  "eco-laundry-detergents": jug,
  "fabric-softeners": jug,
  "washing-machine-cleaners": box,
  "dishwasher-cleaners": box,
  "eco-dish-soaps-and-pods": squeezeBottle,
  "drain-cleaners": squeezeBottle,
  "toilet-cleaners": toiletBottle,
  "glass-window-cleaners": sprayBottle,
  "wood-and-furniture-polish": aerosol,
  "oven-cleaners": aerosol,
  "stainless-steel-cleaners": wipesCanister,
};

const BY_SLUG: Record<string, Draw> = {
  "bissell-steambuddy": handheldSteam,
  "bissell-spinwave": floorWetDry,
  "o-cel-o-spin-mop": spinMop,
  "bona-premium-spray-mop": sprayMop,
  "libman-wonder-mop": cottonMop,
  "swiffer-sweeper": sweeper,
  "chom-chom-roller": roller,
  furemover: rubberBrush,
  "mr-clean-magic-eraser": eraser,
  "scotch-brite-scour-pads": scourPads,
  "scrub-daddy": sponge,
  "bar-keepers-friend": powderCan,
  "soft-scrub": squeezeBottle,
  "clr-calcium-lime-rust": squeezeBottle,
  "grove-multi-surface-refill": squeezeBottle,
  "biokleen-all-purpose": squeezeBottle,
  "shout-advanced": squeezeBottle,
  "tide-to-go": pen,
  "scrubbing-bubbles-toilet-gel": pen,
  "bounce-dryer-sheets": box,
  "downy-unstopables": squeezeBottle,
  "dropps-laundry-pods": tub,
  "dropps-dishwasher-pods": tub,
  "blueland-dish-tablets": pouch,
  "finish-max-in-3-dishwasher-cleaner": squeezeBottle,
  "weiman-glass-cooktop-cleaner-kit": squeezeBottle,
  "sprayway-glass-cleaner": aerosol,
  "invisible-glass": aerosol,
  "old-english-lemon-oil": squeezeBottle,
};

function drawFor(p: Product): Draw {
  return BY_SLUG[p.slug] ?? BY_CATEGORY[p.category] ?? sprayBottle;
}

/** Small items are drawn larger (anchored on the ground line) so they fill the frame. */
const SCALE = new Map<Draw, number>([
  [pen, 1.3], [aerosol, 1.25], [squeezeBottle, 1.2], [toiletBottle, 1.2], [powderCan, 1.2], [wipesCanister, 1.25],
  [sprayBottle, 1.15], [jug, 1.1], [box, 1.12], [pouch, 1.12], [tub, 1.2], [sponge, 1.4], [scourPads, 1.4],
  [eraser, 1.4], [cloths, 1.35], [roller, 1.3], [spotCleaner, 1.15], [handheldSteam, 1.15], [robot, 1.15], [shopVac, 1.15],
]);

function productSvg(p: Product) {
  const pal = palette(p);
  const label = LABEL_OVERRIDES[p.slug] ?? p.brand;
  const draw = drawFor(p);
  const s = SCALE.get(draw) ?? 1;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Illustration of the ${esc(p.name)}">
  ${defs(pal)}
  <rect width="${W}" height="${H}" fill="url(#g-bg)"/>
  <circle cx="600" cy="470" r="400" fill="url(#g-halo)"/>
  <rect x="0" y="${GROUND + 20}" width="${W}" height="${H - GROUND - 20}" fill="#e6ebf0"/>
  <g transform="translate(600 ${GROUND}) scale(${s}) translate(-600 -${GROUND})">${draw(pal, label)}</g>
  <text x="1170" y="872" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="2" fill="#94a3b8">ILLUSTRATION</text>
</svg>
`;
}

mkdirSync(join(ROOT, "images/products"), { recursive: true });
await Promise.all(
  products.map(async (p) => {
    const svg = productSvg(p);
    writeFileSync(join(ROOT, "images/products", `${p.slug}.svg`), svg, "utf8");
    await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(join(ROOT, "images/products", `${p.slug}.jpg`));
  }),
);

/** Brand mark: teal tile with a white spray-bottle glyph. Used for favicon, apple icon and the schema logo. */
const markSvg = (size: number, radius: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="#0e7490"/>
  <path d="M22 28 Q22 23 27 22 L27 18 L37 18 L37 22 Q42 23 42 28 L42 50 Q42 53 39 53 L25 53 Q22 53 22 50 Z" fill="#ffffff"/>
  <path d="M25 11 L39 11 Q41 11 41 13 L41 17 L25 17 Z" fill="#ffffff"/>
  <rect x="17" y="12" width="9" height="3.5" rx="1.5" fill="#ffffff"/>
  <rect x="26" y="33" width="12" height="10" rx="2" fill="#0e7490"/>
</svg>
`;
writeFileSync(join(process.cwd(), "src/app/icon.svg"), markSvg(64, 14), "utf8");
await sharp(Buffer.from(markSvg(180, 0))).png().toFile(join(process.cwd(), "src/app/apple-icon.png"));
await sharp(Buffer.from(markSvg(512, 0))).png().toFile(join(ROOT, "logo.png"));

/** Default share image (1200x630) for pages without a product image. */
const ogPicks = ["dyson-v15-detect", "windex-original", "o-cel-o-spin-mop"]
  .map((s) => products.find((p) => p.slug === s))
  .filter((p): p is Product => !!p);
const ogTiles = await Promise.all(ogPicks.map((p) => sharp(Buffer.from(productSvg(p))).resize(360, 270).png().toBuffer()));
const ogBase = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="12" fill="#0e7490"/>
  <text x="80" y="140" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="700" fill="#1f2430">Cleaning<tspan fill="#0e7490">Products</tspan>Reviews.com</text>
  <text x="80" y="200" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#5b6472">Independent reviews, comparisons and buying guides</text>
  <text x="80" y="240" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#5b6472">for cleaning products, tools and machines.</text>
  <rect x="64" y="300" width="1072" height="290" rx="18" fill="#f1f5f8"/>
</svg>`;
await sharp(Buffer.from(ogBase))
  .composite(ogTiles.map((input, i) => ({ input, left: 80 + i * 360, top: 310 })))
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(join(ROOT, "og-default.jpg"));

/** Author avatar */
mkdirSync(join(ROOT, "images/authors"), { recursive: true });
writeFileSync(
  join(ROOT, "images/authors/team.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" role="img" aria-label="Editorial team avatar">
  <defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e7490"/><stop offset="1" stop-color="#155e75"/></linearGradient></defs>
  <rect width="400" height="400" rx="80" fill="url(#a)"/>
  <circle cx="200" cy="150" r="52" fill="#fff" opacity="0.92"/>
  <path d="M92 340c10-72 54-108 108-108s98 36 108 108z" fill="#fff" opacity="0.92"/>
  <path d="M150 92l18 40 44 4-33 28 9 42-38-22-38 22 9-42-33-28 44-4z" fill="#fbbf24"/>
</svg>
`,
  "utf8",
);

console.log(`Generated ${products.length} product illustrations (SVG + JPEG) + author avatar in public/images/`);
