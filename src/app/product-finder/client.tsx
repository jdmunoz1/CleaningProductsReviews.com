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
      <header className="text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-ink">Product Finder</p>
        <h1 className="prose-h">What are you actually cleaning?</h1>
        <p className="mt-3 text-muted">Answer three quick questions and we&apos;ll point you at the right reviews.</p>
      </header>

      <div className="mt-8 space-y-6">
        <Question title="1. What floors are you working with?" desc="This is the biggest driver of what to buy.">
          <div className="grid gap-2 sm:grid-cols-2">
            {(["carpet-focused", "hard-floors", "mixed", "any"] as Floors[]).map((f) => (
              <Option key={f} active={floor === f} onClick={() => setFloor(f)}>{FLOOR_LABEL[f]}</Option>
            ))}
          </div>
        </Question>

        <Question title="2. Do you have pets that shed?" desc="Pet hair changes the vacuum answer more than any spec sheet.">
          <div className="grid gap-2 sm:grid-cols-3">
            {(["yes", "no", "any"] as Pets[]).map((p) => (
              <Option key={p} active={pets === p} onClick={() => setPets(p)}>{PET_LABEL[p]}</Option>
            ))}
          </div>
        </Question>

        <Question title="3. What does the job look like?" desc="Pick the thing you spend the most time on.">
          <div className="grid gap-2 sm:grid-cols-3">
            {(["quick-daily", "deep-cleaning", "spot-stains", "looks", "any"] as Job[]).map((j) => (
              <Option key={j} active={job === j} onClick={() => setJob(j)}>{JOB_LABEL[j]}</Option>
            ))}
          </div>
        </Question>
      </div>

      <section className="mt-10 border-t border-line pt-8">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{resultCount}</span> relevant reviews across{" "}
          <span className="font-semibold text-ink">{categoryCount}</span> categories.
        </p>
        <div className="mt-4 grid gap-3">
          {matches.slice(0, 12).map((p) => (
            <Link key={p.slug} href={urlFor("review", p.slug)} className="group flex items-start justify-between gap-4 rounded-xl border border-line p-4 transition hover:border-accent">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{p.brand} · {categories[p.category]?.name ?? p.category}</p>
                <h3 className="mt-0.5 font-semibold text-ink group-hover:text-accent-ink">{p.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.tagline}</p>
              </div>
              <span className="flex-none text-accent-ink">→</span>
            </Link>
          ))}
        </div>
        {resultCount === 0 && (
          <p className="mt-4 text-sm text-muted">No exact matches — try loosening a filter.</p>
        )}
      </section>
    </div>
  );
}

function Question({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-semibold text-ink">{title}</legend>
      <p className="mt-0.5 text-sm text-muted">{desc}</p>
      <div className="mt-3">{children}</div>
    </fieldset>
  );
}

function Option({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
        active
          ? "border-accent bg-accent-soft text-accent-ink"
          : "border-line bg-paper text-ink hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}
