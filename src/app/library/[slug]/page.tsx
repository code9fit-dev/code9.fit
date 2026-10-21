"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/primitives";
import { SiteFooter } from "@/components/SiteFooter";
import { ProgramDocument } from "@/components/ProgramDocument";
import { PackageGate } from "@/components/PackageGate";
import { StartNowButton } from "@/components/StartNowButton";
import { getProgram } from "@/data/workout-library";
import { programToMarkdown } from "@/data/workout-library/document";

export default function ProgramPage() {
  const { slug } = useParams<{ slug: string }>();
  const program = getProgram(slug);

  if (!program) {
    return (
      <Container className="py-20 text-center">
        <p className="mb-4 text-ink-dim">That program doesn&rsquo;t exist.</p>
        <Link href="/library" className="btn-primary">
          All packages
        </Link>
      </Container>
    );
  }

  function download() {
    if (!program) return;
    const md = programToMarkdown(program);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `c9f-${program.meta.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <main className="relative z-10 flex-1">
        <Container className="py-8">
          <Link href="/library" className="font-mono text-xs text-ink-dim mb-6 inline-block">
            ← All packages
          </Link>

          <div className="relative mb-6">
            <button onClick={download} className="btn-primary">
              Download package
            </button>
            <div className="absolute top-0 right-0">
              <StartNowButton
                programId={program.meta.id}
                programSlug={slug}
                isPurchasable={program.meta.purchasable}
              />
            </div>
          </div>

          <PackageGate packageId={program.meta.id}>
            <ProgramDocument program={program} />
          </PackageGate>

          <p className="mx-auto mt-6 max-w-[720px] font-mono text-[10px] text-ink-dim">
            Preview download. In production, package purchase + delivery is
            handled by Lemon Squeezy.
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
