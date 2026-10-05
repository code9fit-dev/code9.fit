"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ThemeController } from "@/components/ThemeController";
import { ALL_TIERS, slugify, type Tier } from "@/data/coaches";
import { saveProfile, signIn } from "@/lib/store/store";
import {
  TOTAL_STEPS,
  emptyIntake,
  environmentOptions,
  experienceOptions,
  goalOptions,
  medicalOptions,
  onboardingSteps,
  resolveMatch,
  type Environment,
  type Experience,
  type Goal,
  type IntakeState,
} from "@/data/onboarding";

const REQUIRED_STEP3 = [
  "age",
  "sex",
  "height",
  "weight",
  "experience",
  "goal",
  "environment",
  "medical",
] as const;

function OnboardingFlow() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier");
  // The paid tier the user chose from pricing (if any) — drives the payment
  // hand-off at the end of onboarding.
  const paidTier: Tier | null =
    tierParam && ALL_TIERS.includes(tierParam as Tier) && tierParam !== "Free"
      ? (tierParam as Tier)
      : null;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<IntakeState>(emptyIntake);
  const [invalid, setInvalid] = useState<Set<string>>(new Set());

  const meta = onboardingSteps[step - 1];

  function set<K extends keyof IntakeState>(key: K, value: IntakeState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (invalid.has(key)) {
      setInvalid((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }

  function goTo(next: number) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateStep3() {
    const missing = REQUIRED_STEP3.filter((k) => !form[k]);
    if (missing.length > 0) {
      setInvalid(new Set(missing));
      const first = document.getElementById(`fg-${missing[0]}`);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setInvalid(new Set());
    goTo(4);
  }

  const step1Ready =
    form.email.trim() !== "" && form.password !== "" && form.ageGate;
  const match = step === 5 ? resolveMatch(form) : null;

  function confirmAndMatch() {
    // Persist the intake profile and sign the user in (their email is the
    // identity until real auth lands; the admin email unlocks admin mode).
    saveProfile(form);
    if (form.email.trim()) signIn(form.email);
    goTo(5);
  }

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[520px] flex-col px-6 pb-20 pt-7">
      <ThemeController theme="signature" />

      <Link href="/" className="mb-6 font-display text-base font-bold tracking-wide">
        CODE<span className="text-accent">9</span> FITNESS
      </Link>

      {paidTier && (
        <div className="fill-accent mb-4 rounded border border-accent px-3.5 py-2 font-mono text-[11px] text-accent">
          Signing up for the {paidTier} plan — payment comes right after your
          coach match.
        </div>
      )}

      {/* PROGRESS */}
      <div className="mb-9">
        <div className="mb-2 flex justify-between font-mono text-[11px] text-ink-dim">
          <span className="text-accent">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span>{meta.name}</span>
        </div>
        <div className="h-0.5 overflow-hidden rounded-sm bg-line">
          <div
            className="h-full bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1 — ACCOUNT */}
      {step === 1 && (
        <StepShell
          eyebrow={meta.eyebrow}
          title="Let's set up your account."
          desc="Takes 30 seconds. No card required to start."
        >
          <Field label="Email" required>
            <input
              type="email"
              className="c9-input"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label="Password" required>
            <input
              type="password"
              className="c9-input"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
            />
          </Field>

          <CheckboxRow
            id="age-gate"
            checked={form.ageGate}
            onChange={(v) => set("ageGate", v)}
            label="I confirm I am 16 years of age or older."
            sub="C9F is built for ages 16+ in line with EU data protection requirements."
          />

          <NavRow>
            <span />
            <button
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => goTo(2)}
              disabled={!step1Ready}
            >
              Continue
            </button>
          </NavRow>
        </StepShell>
      )}

      {/* STEP 2 — GDPR CONSENT */}
      {step === 2 && (
        <StepShell
          eyebrow={meta.eyebrow}
          title="How we use your info."
          desc="This is health-related data, so EU law requires us to ask clearly, separately from our general terms."
        >
          <div className="fill-accent mb-5 rounded border border-line p-[18px] text-[13.5px] text-ink-dim">
            <strong className="text-ink">
              C9F coaches use your age, height, weight, and training info
            </strong>{" "}
            to personalize your plan and calculate things like calorie targets
            and training load. This is treated as health data under GDPR.
            <br />
            <br />
            We never sell this data, and it&rsquo;s never used to train AI models
            outside your own coaching without separate opt-in.{" "}
            <a href="#" className="text-accent underline">
              Read the full policy →
            </a>
          </div>

          <CheckboxRow
            id="consent-health"
            checked={form.consentHealth}
            onChange={(v) => set("consentHealth", v)}
            label="I consent to C9F collecting and using my health-related information as described above."
          />

          <p className="mt-2.5 rounded border border-safety/30 bg-safety/10 px-3.5 py-3 text-[12.5px] text-ink-dim">
            If you don&rsquo;t consent, you can still use Free-tier education
            content — personalized plans require this data to work safely.
          </p>

          <NavRow>
            <button className="btn-back" onClick={() => goTo(1)}>
              Back
            </button>
            <button
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => goTo(3)}
              disabled={!form.consentHealth}
            >
              Continue
            </button>
          </NavRow>
        </StepShell>
      )}

      {/* STEP 3 — CORE INTAKE */}
      {step === 3 && (
        <StepShell
          eyebrow={meta.eyebrow}
          title="Tell us about you."
          desc="This is what your coach uses to build a plan that actually fits — not a generic template."
        >
          {invalid.size > 0 && (
            <div className="mb-5 rounded border border-safety bg-safety/10 px-4 py-3.5 text-[13.5px] text-ink">
              ⚠ Please complete every field below — your coach needs this to
              build a safe, accurate plan.
            </div>
          )}

          <div className="flex gap-3">
            <Field id="fg-age" label="Age" required invalid={invalid.has("age")}>
              <input
                type="number"
                className="c9-input"
                placeholder="32"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
              />
            </Field>
            <Field
              id="fg-sex"
              label="Biological sex"
              required
              invalid={invalid.has("sex")}
            >
              <select
                className="c9-input"
                value={form.sex}
                onChange={(e) => set("sex", e.target.value)}
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </Field>
          </div>

          <div className="flex gap-3">
            <Field
              id="fg-height"
              label="Height (cm)"
              required
              invalid={invalid.has("height")}
            >
              <input
                type="number"
                className="c9-input"
                placeholder="178"
                value={form.height}
                onChange={(e) => set("height", e.target.value)}
              />
            </Field>
            <Field
              id="fg-weight"
              label="Weight (kg)"
              required
              invalid={invalid.has("weight")}
            >
              <input
                type="number"
                className="c9-input"
                placeholder="78"
                value={form.weight}
                onChange={(e) => set("weight", e.target.value)}
              />
            </Field>
          </div>

          <ChipField
            id="fg-experience"
            label="Experience level"
            invalid={invalid.has("experience")}
            options={experienceOptions}
            value={form.experience}
            onSelect={(v) => set("experience", v as Experience)}
          />

          <ChipField
            id="fg-goal"
            label="Primary goal"
            invalid={invalid.has("goal")}
            options={goalOptions}
            value={form.goal}
            onSelect={(v) => set("goal", v as Goal)}
          />

          <ChipField
            id="fg-environment"
            label="Training environment"
            invalid={invalid.has("environment")}
            options={environmentOptions}
            value={form.environment}
            onSelect={(v) => set("environment", v as Environment)}
          />

          <Field
            id="fg-medical"
            label="Significant medical history"
            required
            invalid={invalid.has("medical")}
          >
            <div className="flex flex-wrap gap-2.5">
              {medicalOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className="c9-chip"
                  data-selected={form.medical === opt.value}
                  onClick={() => set("medical", opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-2.5 rounded border border-safety/30 bg-safety/10 px-3.5 py-3 text-[12.5px] text-ink-dim">
              We mean surgeries, joint replacements, or major injuries (e.g. a
              torn ACL) — everyday muscle soreness doesn&rsquo;t count.
            </p>
          </Field>

          <NavRow>
            <button className="btn-back" onClick={() => goTo(2)}>
              Back
            </button>
            <button className="btn-primary flex-1" onClick={validateStep3}>
              Continue
            </button>
          </NavRow>
        </StepShell>
      )}

      {/* STEP 4 — CONFIRM-BACK */}
      {step === 4 && (
        <StepShell
          eyebrow={meta.eyebrow}
          title="Let's confirm before we build anything."
          desc="Quick check — this is what your coach will use."
        >
          <div className="schematic fill-panel mb-5 rounded border border-line p-5">
            <div className="mb-3.5 font-mono text-[11px] uppercase tracking-wide text-accent">
              {"// Client profile"}
            </div>
            <SummaryRow k="Age" v={form.age || "—"} onEdit={() => goTo(3)} />
            <SummaryRow k="Biological sex" v={form.sex || "—"} />
            <SummaryRow
              k="Height / Weight"
              v={
                form.height && form.weight
                  ? `${form.height}cm / ${form.weight}kg`
                  : "—"
              }
            />
            <SummaryRow k="Experience" v={form.experience || "—"} />
            <SummaryRow k="Goal" v={form.goal || "—"} />
            <SummaryRow k="Environment" v={form.environment || "—"} />
            <SummaryRow k="Medical history" v={form.medical || "—"} last />
          </div>

          <p className="rounded border border-safety/30 bg-safety/10 px-3.5 py-3 text-[12.5px] text-ink-dim">
            If anything here is wrong, tap &ldquo;edit&rdquo; above before
            continuing — your plan is built directly from this data.
          </p>

          <NavRow>
            <button className="btn-back" onClick={() => goTo(3)}>
              Back
            </button>
            <button className="btn-primary flex-1" onClick={confirmAndMatch}>
              Confirm &amp; match my coach
            </button>
          </NavRow>
        </StepShell>
      )}

      {/* STEP 5 — COACH MATCH */}
      {step === 5 && match && (
        <StepShell
          eyebrow={meta.eyebrow}
          title="You're matched."
          desc="Based on your profile, here's your primary specialist."
        >
          <div className="fill-accent mb-5 rounded border border-accent p-6">
            <span className="mb-3 inline-block rounded-sm bg-accent px-2.5 py-[3px] font-mono text-[10px] tracking-wide text-on-accent">
              {match.tag}
            </span>
            <div className="mb-2 font-display text-[22px] font-semibold">
              {match.name}
            </div>
            <div className="mb-3.5 text-sm text-ink-dim">{match.desc}</div>
            <div className="border-t border-line pt-3 font-mono text-xs text-ink-dim">
              {match.safety ? (
                match.bundleNote
              ) : (
                <>
                  Pairs well with:{" "}
                  <span className="text-accent">{match.bundleNote}</span> —
                  bundle discount available at checkout.
                </>
              )}
            </div>
          </div>

          <Link
            href="/#coaches"
            className="self-start text-[13px] text-ink-dim underline"
          >
            See all 9 coaches instead →
          </Link>

          <NavRow>
            <button className="btn-back" onClick={() => goTo(4)}>
              Back
            </button>
            <Link
              href={
                paidTier
                  ? `/checkout?coach=${slugify(match.name)}&tier=${encodeURIComponent(paidTier)}`
                  : `/coach/${slugify(match.name)}`
              }
              className="btn-primary flex-1 text-center"
            >
              {paidTier ? `Continue to payment — ${paidTier}` : "Start with this coach"}
            </Link>
          </NavRow>
        </StepShell>
      )}
    </div>
  );
}

/* ---------- small presentational helpers ---------- */

function StepShell({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
        {`// ${eyebrow}`}
      </div>
      <h1 className="mb-2.5 font-display text-[26px] font-semibold leading-tight">
        {title}
      </h1>
      <p className="mb-7 max-w-[420px] text-sm text-ink-dim">{desc}</p>
      {children}
    </div>
  );
}

function Field({
  id,
  label,
  required,
  invalid,
  children,
}: {
  id?: string;
  label: string;
  required?: boolean;
  invalid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mb-5 flex-1">
      <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-ink-dim">
        {label}
        {required && <span className="ml-1 text-safety">*</span>}
      </label>
      <div className={invalid ? "rounded ring-1 ring-safety" : ""}>
        {children}
      </div>
    </div>
  );
}

function ChipField({
  id,
  label,
  invalid,
  options,
  value,
  onSelect,
}: {
  id: string;
  label: string;
  invalid?: boolean;
  options: readonly string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div id={id} className="mb-5">
      <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-ink-dim">
        {label}
        <span className="ml-1 text-safety">*</span>
      </label>
      <div
        className={`flex flex-wrap gap-2.5 rounded ${
          invalid ? "p-1.5 ring-1 ring-safety" : ""
        }`}
      >
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className="c9-chip"
            data-selected={value === opt}
            onClick={() => onSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckboxRow({
  id,
  checked,
  onChange,
  label,
  sub,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  sub?: string;
}) {
  return (
    <div className="fill-panel mb-4 flex items-start gap-3 rounded border border-line p-4">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-[3px] h-4 w-4 flex-shrink-0 accent-[var(--accent)]"
      />
      <label htmlFor={id} className="text-[13.5px] text-ink">
        {label}
        {sub && (
          <span className="mt-1 block text-[12.5px] text-ink-dim">{sub}</span>
        )}
      </label>
    </div>
  );
}

function SummaryRow({
  k,
  v,
  onEdit,
  last,
}: {
  k: string;
  v: string;
  onEdit?: () => void;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between py-2.5 text-sm ${
        last ? "" : "border-b border-line"
      }`}
    >
      <span className="text-ink-dim">{k}</span>
      <span className="font-mono">
        {v}
        {onEdit && (
          <button
            onClick={onEdit}
            className="ml-2 text-xs text-accent underline"
          >
            edit
          </button>
        )}
      </span>
    </div>
  );
}

function NavRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto flex justify-between gap-3 pt-7">{children}</div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center text-ink-dim">Loading…</div>}
    >
      <OnboardingFlow />
    </Suspense>
  );
}
