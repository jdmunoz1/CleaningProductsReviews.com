"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/content/products";
import { categories } from "@/content/categories";
import { urlFor } from "@/lib/catalog";

type Pets = "yes" | "no" | "any";
type Floors = "carpet-focused" | "hard-floors" | "mixed" | "any";
type Job = "quick-daily" | "deep-cleaning" | "spot-stains" | "looks" | "any";

const FLOOR_LABEL: Record<Floors, string> = {
  "carpet-focused": "Mostly carpet",
  "hard-floors": "Mostly hard floors",
  mixed: "A mix of both",
  any: "Not sure",
};
const PET_LABEL: Record<Pets, string> = {
  yes: "Yes",
  no: "No",
  any: "It doesn't matter",
};
const JOB_LABEL: Record<Job, string> = {
  "quick-daily": "Quick daily maintenance",
  "deep-cleaning": "Deep, thorough cleaning",
  "spot-stains": "Stains and spots",
  looks: "Keeping things looking good",
  any: "Skip",
};

export function ProductFinderClient() {
  const [floor, setFloor] = useState<Floors>("any");
  const [pets, setPets] = useState<Pets>("any");
  const [job, setJob] = useState<Job>("any");

  const matches = useMemo(() => {
    let list = [...products];
    if (floor === "carpet-focused") {
      list = list.filter((p) => ["carpet-cleaners", "vacuums", "upright-vacuums", "cordless-vacuums", "robot-vacuums"].includes(p.category) || p.idealFor.some((s) => /carpet|upholstery|stains/.test(s)));
    }
    if (floor === "hard-floors") {
      list = list.filter((p) => p.idealFor.some((s) => /hard/.test(s)) || ["steam-mops", "mops", "floor-scrubbers", "spin-mops"].includes(p.category) || p.idealFor.some((s) => /floor|tile|wood|sealed/.test(s)));
    }
    if (pets === "yes") {
      list = list.filter((p) => p.idealFor.some((s) => /pet/.test(s)) || ["pet-urine-removers", "pet-cleaning"].includes(p.category) || /pet/.test(p.tagline));
    }
    if (job === "quick-daily") {
      list = list.filter((p) => ["vacuums", "cordless-vacuums", "robot-vacuums", "mops", "steam-mops", "bathroom", "kitchen-sprays"].includes(p.category) || /daily|quick|everyday/.test(p.tagline));
    }
    if (job === "deep-cleaning") {
      list = list.filter((p) => ["carpet-cleaners", "spot-cleaners", "pressure-washers", "washing-machine-cleaners"].includes(p.category) || /deep|stain|extract|carpet/.test(p.tagline));
    }
    if (job === "spot-stains") {
      list = list.filter((p) => ["spot-cleaners", "carpet-stain-removers", "stain-removers", "laundry"].includes(p.category) || /stain|spot|mark/.test(p.tagline));
    }
    if (job === "looks") {
      list = list.filter((p) => /shine|polish|streak|finish|stainless|sparkle/.test(p.tagline) || ["stainless-steel-cleaners", "shower-cleaners"].includes(p.category));
    }
    return list;
  }, [floor, pets, job]);

  const resultCount = matches.length;
  const categoryCount = new Set(matches.map((p) => p.category).filter((c) => categories[c])).size;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="border-t-[3px] border-rule-ink pt-4">
        <p className="label-caps text-ink-3">Product finder</p>
        <h1 className="mt-3 prose-h">What are you actually cleaning?</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">Answer three quick questions and we&apos;ll point you at the right reviews.</p>
      </header>

      <div className="mt-8 rounded-[6px] border border-rule-strong bg-label">
        <Question n="01" title="What floors are you working with?" desc="This is the biggest driver of what to buy.">
          <div className="grid gap-2 sm:grid-cols-2">
            {(["carpet-focused", "hard-floors", "mixed", "any"] as Floors[]).map((f) => (
              <Option key={f} active={floor === f} onClick={() => setFloor(f)}>{FLOOR_LABEL[f]}</Option>
            ))}
          </div>
        </Question>

        <Question n="02" title="Do you have pets that shed?" desc="Pet hair changes the vacuum answer more than any spec sheet.">
          <div className="grid gap-2 sm:grid-cols-3">
            {(["yes", "no", "any"] as Pets[]).map((p) => (
              <Option key={p} active={pets === p} onClick={() => setPets(p)}>{PET_LABEL[p]}</Option>
            ))}
          </div>
        </Question>

        <Question n="03" title="What does the job look like?" desc="Pick the thing you spend the most time on.">
          <div className="grid gap-2 sm:grid-cols-3">
            {(["quick-daily", "deep-cleaning", "spot-stains", "looks", "any"] as Job[]).map((j) => (
              <Option key={j} active={job === j} onClick={() => setJob(j)}>{JOB_LABEL[j]}</Option>
            ))}
          </div>
        </Question>
      </div>

      <section aria-live="polite" className="mt-10 border-t-[3px] border-rule-ink pt-4">
        <p className="label-caps text-ink-3">Matches</p>
        <p className="mt-1 text-[0.9375rem] text-ink-2">
          <span className="num font-display text-2xl font-extrabold text-ink">{resultCount}</span> relevant reviews across{" "}
          <span className="num font-semibold text-ink">{categoryCount}</span> categories.
        </p>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {matches.slice(0, 12).map((p) => (
            <li key={p.slug}>
              <Link href={urlFor("review", p.slug)} className="group grid grid-cols-[1fr_auto] items-start gap-4 py-4">
                <span className="min-w-0">
                  <span className="label-caps block text-ink-3">{p.brand} · {categories[p.category]?.name ?? p.category}</span>
                  <span className="mt-1 block font-display text-lg font-bold leading-snug text-ink [font-stretch:92%] group-hover:underline group-hover:underline-offset-4">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-2">{p.tagline}</span>
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {p.idealFor.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-[3px] border border-rule-strong bg-label px-2 py-0.5 text-[0.8125rem] leading-snug text-ink-2">{s}</span>
                    ))}
                  </span>
                </span>
                <span aria-hidden className="pt-6 text-ink-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-ink">→</span>
              </Link>
            </li>
          ))}
        </ul>
        {resultCount === 0 && (
          <p className="mt-4 text-[0.9375rem] text-ink-2">No exact matches. Try loosening a filter.</p>
        )}
      </section>
    </div>
  );
}

function Question({ n, title, desc, children }: { n: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-rule px-5 py-5 last:border-b-0">
      <legend className="sr-only">{title}</legend>
      <p aria-hidden className="flex items-baseline gap-3">
        <span className="num font-display text-sm font-bold text-ink-4">{n}</span>
        <span className="font-display text-lg font-bold [font-stretch:92%]">{title}</span>
      </p>
      <p className="mt-0.5 pl-8 text-sm text-ink-3">{desc}</p>
      <div className="mt-3 sm:pl-8">{children}</div>
    </fieldset>
  );
}

function Option({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-11 items-center gap-2 rounded-[4px] border px-3 py-2.5 text-left text-[0.9375rem] font-medium transition-colors duration-150 ${
        active ? "border-ink bg-glove-soft text-ink" : "border-rule-strong bg-label text-ink-2 hover:border-ink hover:text-ink"
      }`}
    >
      <span
        aria-hidden
        className={`grid size-4 flex-none place-items-center rounded-[2px] border text-[0.6875rem] font-bold leading-none ${
          active ? "border-ink bg-ink text-glove" : "border-rule-strong"
        }`}
      >
        {active ? "✓" : ""}
      </span>
      {children}
    </button>
  );
}
