import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Container, SectionHead } from "@/components/primitives";
import { library } from "@/data/workout-library";
import { LibraryBrowser } from "./LibraryBrowser";

export const metadata = {
  title: "Program packages — Code9 Fitness",
  description:
    "Downloadable, structured training program packages from the ImpactShredz library. © Code9 Fitness.",
};

export default function LibraryPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10 flex-1">
        <Container className="py-12">
          <SectionHead
            eyebrow="Program packages"
            title="Downloadable program packages"
            sub="Structured, ready-to-run training programs — © Code9 Fitness. Pick your goal, your training days, and your level. Buy once, yours to keep, with a weekly tracker."
          />
          <LibraryBrowser programs={library} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
