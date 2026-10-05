import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[720px] px-6 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  withRule = false,
}: {
  children: ReactNode;
  withRule?: boolean;
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
      {withRule && <span className="inline-block h-px w-5 bg-accent" />}
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  titleClassName = "",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <div className="mb-9">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={`font-display text-[28px] font-semibold leading-tight ${titleClassName}`}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-3 max-w-[500px] text-ink-dim">{sub}</p>
      )}
    </div>
  );
}
