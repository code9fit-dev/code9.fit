import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-[720px] items-center justify-between border-t border-line px-6 py-7 font-mono text-[11px] text-ink-dim">
      <span>CODE9 FITNESS</span>
      <Link href="/library" className="hover:text-accent">
        Program packages
      </Link>
      <span>SYSTEM v2.0 — DRAFT</span>
    </footer>
  );
}
