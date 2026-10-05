'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Container, SectionHead } from '@/components/primitives';
import { useState, useMemo } from 'react';
import { library, type Goal, type Level, type Equipment } from '@/data/workout-library';

export default function DownloadsPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | 'all'>('all');

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

      script.onload = () => {
        fetch('/C9F_72hr_Fast_Theme.html')
          .then(res => res.text())
          .then(html => {
            const element = document.createElement('div');
            element.innerHTML = html;

            const opt = {
              margin: [5, 10, 5, 10],
              filename: 'C9F_72hr_Fast.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true, allowTaint: true },
              jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };

            (window as any).html2pdf().set(opt).from(element).save();
            setIsDownloading(false);
          })
          .catch(err => {
            console.error('Error:', err);
            setIsDownloading(false);
          });
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setIsDownloading(false);
    }
  };

  const purchasablePrograms = library.filter(p => p.meta.purchasable);

  // Get unique filter options
  const goals = Array.from(new Set(purchasablePrograms.flatMap(p => p.meta.goals)));
  const levels = Array.from(new Set(purchasablePrograms.map(p => p.meta.level)));
  const equipmentOptions = Array.from(new Set(purchasablePrograms.map(p => p.meta.equipment)));

  // Filter programs based on selections
  const filteredPrograms = useMemo(() => {
    return purchasablePrograms.filter(program => {
      const matchesGoal = selectedGoal === 'all' || program.meta.goals.includes(selectedGoal as Goal);
      const matchesLevel = selectedLevel === 'all' || program.meta.level === selectedLevel;
      const matchesEquipment = selectedEquipment === 'all' || program.meta.equipment === selectedEquipment;
      return matchesGoal && matchesLevel && matchesEquipment;
    });
  }, [selectedGoal, selectedLevel, selectedEquipment]);

  // Group filtered programs by goal for display
  const programsByGoal = useMemo(() => {
    return filteredPrograms.reduce((acc, program) => {
      program.meta.goals.forEach(goal => {
        if (!acc[goal]) acc[goal] = [];
        if (!acc[goal].find(p => p.meta.id === program.meta.id)) {
          acc[goal].push(program);
        }
      });
      return acc;
    }, {} as Record<string, typeof filteredPrograms>);
  }, [filteredPrograms]);

  return (
    <>
      <SiteHeader />
      <main className="relative z-10 flex-1">
        {/* FREE RESOURCES SECTION */}
        <section className="border-b border-line py-[60px]">
          <Container>
            <SectionHead
              eyebrow="Free Resources"
              title="Start Here"
              sub="Evidence-based guides to build trust before investing in a program."
            />

            <div className="grid gap-12 md:grid-cols-2 mt-16">
              {/* 72-Hour Fast Guide */}
              <div className="rounded-lg border border-line bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="mb-6">
                  <div className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-wide">
                    Free Download
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-ink mb-3">The 72-Hour Fast</h3>

                <p className="text-ink-dim mb-6">
                  A complete guide to running a safe, evidence-informed 72-hour fast. Includes daily timelines, hydration protocols, what to expect, how to break the fast, and the science behind it.
                </p>

                <div className="mb-8 rounded-lg bg-panel p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-ink">Complete 72-hour timeline with what to expect</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-ink">Daily hydration and electrolyte protocols</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-ink">4-phase refeeding plan with specific meals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-ink">Science & myth-busting section</span>
                  </div>
                </div>

                <button
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {isDownloading ? 'Generating PDF...' : 'Download PDF (8 pages)'}
                </button>

                <p className="text-xs text-ink-dim text-center mt-4">
                  Print-friendly design. No email required.
                </p>
              </div>

              {/* Coming soon card */}
              <div className="rounded-lg border border-line bg-white p-8 opacity-60">
                <div className="mb-6">
                  <div className="inline-block rounded-full bg-panel px-3 py-1 text-xs font-semibold text-ink-dim uppercase tracking-wide">
                    Coming Soon
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-ink mb-3">Macro Calculator</h3>

                <p className="text-ink-dim mb-6">
                  Personalized macro targets based on your goals, activity level, and body composition.
                </p>

                <div className="mb-8 rounded-lg bg-panel p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-ink-dim font-bold mt-0.5">✓</span>
                    <span className="text-sm text-ink">Protein, carb, and fat targets</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-ink-dim font-bold mt-0.5">✓</span>
                    <span className="text-sm text-ink">Daily meal planning framework</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-ink-dim font-bold mt-0.5">✓</span>
                    <span className="text-sm text-ink">Tracking templates</span>
                  </div>
                </div>

                <button
                  disabled
                  className="w-full rounded-lg bg-panel px-6 py-3 font-semibold text-ink-dim cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* TRAINING PROGRAMS SECTION */}
        <section className="border-b border-line py-[60px]">
          <Container>
            <SectionHead
              eyebrow="Training Programs"
              title="Proven Programs"
              sub="Science-backed training designed for your specific goals."
            />

            {/* Filters */}
            <div className="mt-16 p-8 rounded-lg bg-white border border-line">
              <h3 className="text-sm font-semibold text-ink mb-8 uppercase tracking-wide">Filter by:</h3>

              <div className="grid gap-8 md:grid-cols-3">
                {/* Goal Filter */}
                <div>
                  <label className="text-xs font-semibold text-ink-dim uppercase mb-4 block">Goal</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedGoal('all')}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        selectedGoal === 'all'
                          ? 'bg-accent text-white'
                          : 'bg-panel text-ink hover:bg-accent/10'
                      }`}
                    >
                      All
                    </button>
                    {goals.map(goal => (
                      <button
                        key={goal}
                        onClick={() => setSelectedGoal(goal as Goal)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors capitalize ${
                          selectedGoal === goal
                            ? 'bg-accent text-white'
                            : 'bg-panel text-ink hover:bg-accent/10'
                        }`}
                      >
                        {goal.replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="text-xs font-semibold text-ink-dim uppercase mb-4 block">Level</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedLevel('all')}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        selectedLevel === 'all'
                          ? 'bg-accent text-white'
                          : 'bg-panel text-ink hover:bg-accent/10'
                      }`}
                    >
                      All
                    </button>
                    {levels.map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level as Level)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors capitalize ${
                          selectedLevel === level
                            ? 'bg-accent text-white'
                            : 'bg-panel text-ink hover:bg-accent/10'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Equipment Filter */}
                <div>
                  <label className="text-xs font-semibold text-ink-dim uppercase mb-4 block">Equipment</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedEquipment('all')}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        selectedEquipment === 'all'
                          ? 'bg-accent text-white'
                          : 'bg-panel text-ink hover:bg-accent/10'
                      }`}
                    >
                      All
                    </button>
                    {equipmentOptions.map(equipment => (
                      <button
                        key={equipment}
                        onClick={() => setSelectedEquipment(equipment as Equipment)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors capitalize ${
                          selectedEquipment === equipment
                            ? 'bg-accent text-white'
                            : 'bg-panel text-ink hover:bg-accent/10'
                        }`}
                      >
                        {equipment}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-8 text-sm text-ink-dim">
              Showing <strong>{filteredPrograms.length}</strong> program{filteredPrograms.length !== 1 ? 's' : ''}
            </div>

            {/* Programs grid */}
            {Object.keys(programsByGoal).length > 0 ? (
              <div className="mt-12 space-y-16">
                {Object.entries(programsByGoal).map(([goal, programs]) => (
                  <div key={goal}>
                    <h3 className="text-lg font-semibold text-ink mb-8 capitalize border-b border-line pb-4">
                      {goal.replace(/-/g, ' ')} Programs
                    </h3>

                    <div className="grid gap-6 md:grid-cols-3">
                      {programs.map(program => (
                        <Link
                          key={program.meta.id}
                          href={`/programs/${program.meta.id}`}
                          className="rounded-lg border border-line bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                        >
                          <div className="mb-4">
                            <div className="inline-block rounded-full bg-accent/10 px-2 py-1 text-xs font-semibold text-accent uppercase tracking-wide">
                              Premium
                            </div>
                          </div>

                          <h4 className="text-base font-semibold text-ink mb-2">
                            {program.meta.title}
                          </h4>

                          <p className="text-xs text-ink-dim mb-6 line-clamp-2">
                            {program.focus}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-6">
                            <span className="text-xs bg-panel px-2 py-1 rounded text-ink-dim">
                              {program.meta.level}
                            </span>
                            <span className="text-xs bg-panel px-2 py-1 rounded text-ink-dim">
                              {program.meta.daysPerWeek}d/wk
                            </span>
                            <span className="text-xs bg-panel px-2 py-1 rounded text-ink-dim">
                              {program.meta.weeks}wks
                            </span>
                          </div>

                          <button className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                            View Program
                          </button>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-12 text-center">
                <p className="text-ink-dim">No programs match your filters.</p>
              </div>
            )}
          </Container>
        </section>

        {/* Why we give resources away */}
        <section className="border-b border-line py-[60px]">
          <Container>
            <div className="max-w-[600px] mx-auto text-center">
              <h2 className="text-2xl font-bold text-ink mb-4">Why we give resources away</h2>
              <p className="text-ink-dim mb-4">
                The best coaching starts with trust. Our free guides represent our coaching philosophy: evidence-based, practical, and focused on what actually works. Download them, try them, and when you're ready for a comprehensive program, you'll already know we deliver on our promises.
              </p>
              <p className="text-ink-dim">
                No email required. No catch. Just knowledge built into every program we offer.
              </p>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-[60px]">
          <Container>
            <div className="rounded-lg border border-line bg-white p-12 text-center">
              <h2 className="text-2xl font-bold text-ink mb-4">Ready to start training?</h2>
              <p className="text-ink-dim mb-8">
                Choose a program that matches your goals and start your transformation.
              </p>
              <Link
                href="/library"
                className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Browse All Programs
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
