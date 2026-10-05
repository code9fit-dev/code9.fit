import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { CoachIndex } from "@/components/CoachIndex";
import { HowItWorks } from "@/components/HowItWorks";
import { Trust } from "@/components/Trust";
import { Pricing } from "@/components/Pricing";
import { FinalCta } from "@/components/FinalCta";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10 flex-1">
        <Hero />
        <CoachIndex />
        <HowItWorks />
        <Trust />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
