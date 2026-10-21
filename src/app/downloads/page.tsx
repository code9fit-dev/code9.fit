'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Container, SectionHead } from '@/components/primitives';
import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

export default function DownloadsPage() {
  const { user, loading } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = '/C9F_72hr_Fast.pdf';
      link.download = 'C9F_72hr_Fast.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setIsDownloading(false);
    }
  };

  const handleDownloadPdfFile = (filename: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewHtmlResource = (htmlFile: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    window.open(`/${htmlFile}`, '_blank');
  };

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

            <div className="grid gap-8 md:grid-cols-3 mt-16">
              {/* 72-Hour Fast Guide */}
              <div className="group border border-line rounded-lg bg-white overflow-hidden hover:border-accent hover:shadow-md transition-all duration-200">
                <div className="h-2 bg-gradient-to-r from-accent to-accent/60"></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">Fasting</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">The 72-Hour Fast</h3>
                  <p className="text-sm text-ink-dim mb-6 flex-grow">
                    Evidence-based guide with timelines, protocols, refeeding plans, and science.
                  </p>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="w-full rounded-lg bg-accent text-white py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {isDownloading ? 'Generating...' : 'Download'}
                  </button>
                </div>
              </div>

              {/* Check-In Guide */}
              <div className="group border border-line rounded-lg bg-white overflow-hidden hover:border-accent hover:shadow-md transition-all duration-200">
                <div className="h-2 bg-gradient-to-r from-accent to-accent/60"></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">Coaching</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">Check-In Guide</h3>
                  <p className="text-sm text-ink-dim mb-6 flex-grow">
                    Structured framework for coaching check-ins with templates and progress tracking.
                  </p>
                  <button
                    onClick={() => handleDownloadPdfFile('C9F_CheckIn_Guide.pdf')}
                    className="w-full rounded-lg bg-accent text-white py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Fascia Training Guide */}
              <div className="group border border-line rounded-lg bg-white overflow-hidden hover:border-accent hover:shadow-md transition-all duration-200">
                <div className="h-2 bg-gradient-to-r from-accent to-accent/60"></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">Mobility</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">Fascia Training</h3>
                  <p className="text-sm text-ink-dim mb-6 flex-grow">
                    Complete guide to fascia-release techniques, mobility work, and performance enhancement.
                  </p>
                  <button
                    onClick={() => handleViewHtmlResource('code9-fascia-training.html')}
                    className="w-full rounded-lg bg-accent text-white py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Recovery & Resilience Coaching Guide */}
              <div className="group border border-line rounded-lg bg-white overflow-hidden hover:border-accent hover:shadow-md transition-all duration-200">
                <div className="h-2 bg-gradient-to-r from-accent to-accent/60"></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">Recovery & Resilience</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">Nervous System & Recovery</h3>
                  <p className="text-sm text-ink-dim mb-6 flex-grow">
                    Evidence-informed guide to help clients understand stress, nervous system awareness, and recovery techniques within coaching scope.
                  </p>
                  <button
                    onClick={() => handleViewHtmlResource('nervous-system-coaching-guide.html')}
                    className="w-full rounded-lg bg-accent text-white py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    View
                  </button>
                </div>
              </div>

            </div>

            {/* Gated Resources */}
            <div className="mt-16">
              <h3 className="text-lg font-semibold text-ink mb-8">Workout Programs</h3>
              <p className="text-sm text-ink-dim mb-8">18 proven 9-week programs across 4 series: Fat-to-Fit, Hybrid Training, Peachy, and Lean Bulk. Find your match or browse by experience level.</p>

              {/* Program Finder Card */}
              <div className="rounded-lg border border-accent bg-white p-8 mb-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                    Find Your Program
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-ink mb-3">Browse All Programs</h4>
                <p className="text-sm text-ink-dim mb-6 max-w-2xl">
                  Answer four quick questions to get matched to your ideal program, or explore all 18 options organized by goal, experience level, and available equipment.
                </p>
                <button
                  onClick={() => handleViewHtmlResource('code9-find-your-program.html')}
                  className="inline-block rounded-lg bg-accent text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Find My Program →
                </button>
              </div>

              <h3 className="text-lg font-semibold text-ink mb-8 mt-16">Coaching Tools</h3>
              <p className="text-sm text-ink-dim mb-8">Additional resources to support your transformation.</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: 'Holistic Wellness Guide', file: 'code9-holistic-wellness.html', isHtml: true },
                  { name: 'Check-In x3', file: 'C9F_Checkin_x3.pdf' },
                  { name: 'Check-In x4', file: 'C9F_Checkin_x4.pdf' },
                  { name: 'Session Tracker', file: 'C9F_Session_Tracker.pdf' },
                ].map(resource => (
                  <div key={resource.file} className="rounded-lg border border-line bg-white p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <div className="inline-block rounded-full bg-accent/10 px-2 py-1 text-xs font-semibold text-accent uppercase tracking-wide">
                        {user ? 'Access' : 'Sign In'}
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-ink mb-4">{resource.name}</h4>
                    <button
                      onClick={() => resource.isHtml ? handleViewHtmlResource(resource.file) : handleDownloadPdfFile(resource.file)}
                      disabled={loading}
                      className={`w-full rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                        user
                          ? 'bg-accent text-white hover:opacity-90'
                          : 'bg-panel text-ink hover:bg-accent/10'
                      }`}
                    >
                      {loading ? 'Loading...' : user ? (resource.isHtml ? 'View' : 'Download') : 'Sign In'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* PROGRAM PACKS — FREE PROGRAMS */}
        <section className="border-b border-line py-[60px]">
          <Container>
            <SectionHead
              eyebrow="Training Programs"
              title="Complete Program Packs"
              sub="Science-backed training systems with full workout breakdowns and progression."
            />

            <div className="grid gap-8 md:grid-cols-2 mt-16">
              <div className="rounded-lg border border-line bg-white p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                    Download
                  </span>
                </div>
                <h4 className="text-xl font-bold text-ink mb-3">3x4 Program Pack</h4>
                <p className="text-sm text-ink-dim mb-6">
                  Three complete 4-day per week training programs with detailed breakdown of exercises, sets, reps, and progression schemes.
                </p>
                <button
                  onClick={() => handleDownloadPdfFile('C9F_3x4_Program_Pack.pdf')}
                  className="w-full rounded-lg bg-accent text-white px-4 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Download PDF
                </button>
              </div>

              <div className="rounded-lg border border-line bg-white p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                    Download
                  </span>
                </div>
                <h4 className="text-xl font-bold text-ink mb-3">4x4 Program Pack</h4>
                <p className="text-sm text-ink-dim mb-6">
                  Four complete 4-day per week training programs with exercise details, rep ranges, and progressive overload guidelines.
                </p>
                <button
                  onClick={() => handleDownloadPdfFile('C9F_4x4_Program_Pack_4Day.pdf')}
                  className="w-full rounded-lg bg-accent text-white px-4 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Download PDF
                </button>
              </div>
            </div>
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

        {/* Pricing CTA */}
        <section className="border-b border-line py-[60px]">
          <Container>
            <div className="rounded-lg border border-accent bg-white p-12 text-center">
              <h2 className="text-2xl font-bold text-ink mb-4">See Pricing & Plans</h2>
              <p className="text-ink-dim mb-8 max-w-xl mx-auto">
                Choose from one-time programs, flexible coaching stacks, or our premium service with dedicated human coaching at every milestone.
              </p>
              <a
                href="/code9-pricing.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                View Pricing →
              </a>
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
