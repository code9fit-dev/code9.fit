'use client';

import Link from 'next/link';
import { Container } from '@/components/primitives';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'wellness' | 'guides' | 'checklists';
  file: string;
  fileSize: string;
  type: 'pdf' | 'html';
  viewable: boolean;
}

const resources: Resource[] = [
  {
    id: 'fasting',
    title: '72-Hour Fasting Protocol',
    description: 'Complete guide to safely implementing a 72-hour fast for metabolic reset and fat loss.',
    category: 'wellness',
    file: '/C9F_72hr_Fast.pdf',
    fileSize: '492 KB',
    type: 'pdf',
    viewable: false,
  },
  {
    id: 'fascia',
    title: 'Fascia Training Guide',
    description: 'Learn myofascial release techniques and fascia-focused training methods.',
    category: 'wellness',
    file: '/code9-fascia-training.html',
    fileSize: '80 KB',
    type: 'html',
    viewable: true,
  },
  {
    id: 'wellness',
    title: 'Holistic Wellness Daily Protocol',
    description: 'Comprehensive daily wellness routine for optimal recovery and performance.',
    category: 'wellness',
    file: '/code9-holistic-wellness.html',
    fileSize: '63 KB',
    type: 'html',
    viewable: true,
  },
  {
    id: 'checkin-3day',
    title: '3-Day Program Check-In',
    description: 'Specialized template and guidelines for 3-day training splits.',
    category: 'checklists',
    file: '/C9F_Checkin_x3.pdf',
    fileSize: '110 KB',
    type: 'pdf',
    viewable: false,
  },
  {
    id: 'checkin-4day',
    title: '4-Day Program Check-In',
    description: 'Specialized template and guidelines for 4-day training splits.',
    category: 'checklists',
    file: '/C9F_Checkin_x4.pdf',
    fileSize: '114 KB',
    type: 'pdf',
    viewable: false,
  },
];

const categories = [
  { id: 'wellness', name: 'Wellness & Recovery' },
  { id: 'checklists', name: 'Check-In Checklists' },
];

export default function ResourcesPage() {
  const groupedResources = resources.reduce(
    (acc, resource) => {
      if (!acc[resource.category]) acc[resource.category] = [];
      acc[resource.category].push(resource);
      return acc;
    },
    {} as Record<string, Resource[]>
  );

  return (
    <main className="flex-1 relative z-10">
      {/* Hero Section */}
      <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '48px', paddingTop: '48px' }}>
        <Container>
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--accent)' }}>
              <span className="inline-block h-px w-5" style={{ background: 'var(--accent)' }} />
              Free Resources
            </div>
            <h1 className="font-display text-[40px] font-semibold leading-tight mb-4" style={{ color: 'var(--ink)' }}>
              Learn & Grow for Free
            </h1>
            <p className="text-lg" style={{ color: 'var(--ink-dim)' }}>
              Essential guides, protocols, and templates to optimize your training. Everything you need to get started—completely free.
            </p>
          </div>
        </Container>
      </section>

      {/* Resources Section */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <Container className="py-16">
          <div className="space-y-16">
            {categories.map((category) => {
              const categoryResources = groupedResources[category.id] || [];
              if (categoryResources.length === 0) return null;

              return (
                <section key={category.id}>
                  <h2 className="font-display text-xl font-semibold mb-8" style={{ color: 'var(--ink)' }}>
                    {category.name}
                  </h2>

                  {category.id === 'checklists' && (
                    <div
                      className="rounded border p-8 mb-12"
                      style={{
                        borderColor: 'var(--line)',
                        background: 'var(--surface)',
                      }}
                    >
                      <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                        Your Weekly Check-In
                      </div>
                      <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
                        How to Use Your Weekly Check-In
                      </h3>
                      <p className="mb-6" style={{ color: 'var(--ink-dim)' }}>
                        A 60-second habit that helps me coach you better — no wrong answers. This sheet takes less than a minute to fill in, ideally right after your last session of the week. It gives me a quick, honest snapshot of how training actually went — not just what's on the plan — so I can adjust your program before small issues become bigger ones.
                      </p>

                      <h4 className="font-display font-semibold text-base mb-6" style={{ color: 'var(--ink)' }}>
                        What each section is really asking
                      </h4>

                      <div className="grid gap-4 md:grid-cols-2 mb-8">
                        {[
                          {
                            num: '01',
                            title: 'Sessions completed',
                            desc: 'A simple count, no judgment. This tells me your real training frequency versus the plan, so I know whether to adjust volume or intensity.',
                          },
                          {
                            num: '02',
                            title: 'If any missed, why',
                            desc: 'The reason matters more than the number. "No time" and "fatigue or niggle" lead to very different changes to your program.',
                          },
                          {
                            num: '03',
                            title: 'Mood and sleep',
                            desc: 'Two fast signals for recovery. A dip in either is often the first sign you need a lighter week before it shows up as a missed session.',
                          },
                          {
                            num: '04',
                            title: 'Anything feel off physically',
                            desc: 'Flag pain, soreness that doesn't feel normal, or dizziness here — early, small notes let us adjust before it becomes an injury.',
                          },
                          {
                            num: '05',
                            title: 'Next week's sessions',
                            desc: 'Deciding the days and session types now, while it's fresh, makes you far more likely to actually follow through than deciding on the day.',
                          },
                          {
                            num: '06',
                            title: 'Notes • anything worth remembering',
                            desc: 'Life context — travel, work stress, a big event — helps me read the rest of the sheet correctly, not just the numbers.',
                          },
                        ].map((item) => (
                          <div
                            key={item.num}
                            className="rounded border p-4"
                            style={{
                              borderColor: 'var(--line)',
                              background: 'var(--panel)',
                            }}
                          >
                            <div className="flex gap-3 mb-2">
                              <span className="font-display font-semibold text-sm" style={{ color: 'var(--accent)' }}>
                                {item.num}
                              </span>
                              <h5 className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                                {item.title}
                              </h5>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div
                        className="rounded border p-6"
                        style={{
                          borderColor: 'var(--line)',
                          background: 'var(--ink)',
                          color: 'var(--cream)',
                        }}
                      >
                        <h5 className="font-semibold mb-3">A few ground rules</h5>
                        <ul className="space-y-2 text-sm">
                          <li>• Fill it in the same way every week — consistency matters more than perfect answers.</li>
                          <li>• Be honest, especially on the hard weeks. This isn't a report card, it's a planning tool.</li>
                          <li>• If something in section 04 feels serious, don't wait for check-in day — message me directly.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    {categoryResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="rounded border p-6 transition-all hover:border-accent"
                        style={{
                          borderColor: 'var(--line)',
                          background: 'var(--surface)',
                        }}
                      >
                        <h3 className="font-display font-semibold text-base mb-2" style={{ color: 'var(--ink)' }}>
                          {resource.title}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: 'var(--ink-dim)' }}>
                          {resource.description}
                        </p>

                        <div className="flex gap-3 items-center">
                          {resource.viewable ? (
                            <Link
                              href={
                                resource.id === 'checkin-guide'
                                  ? '/resources/checkin-guide'
                                  : resource.id === 'wellness'
                                  ? '/resources/wellness-guide'
                                  : '/resources/fascia-guide'
                              }
                              className="btn-primary"
                            >
                              View Guide
                            </Link>
                          ) : (
                            <a
                              href={resource.file}
                              download
                              className="btn-primary"
                            >
                              Download
                            </a>
                          )}
                          <span className="text-xs font-mono uppercase" style={{ color: 'var(--ink-dim)' }}>
                            {resource.type.toUpperCase()} • {resource.fileSize}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'var(--panel)', borderBottom: '1px solid var(--line)' }}>
        <Container className="py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
              Ready to level up?
            </h2>
            <p className="mb-8" style={{ color: 'var(--ink-dim)' }}>
              These free resources will help you establish routines and build momentum. When you're ready for structured programming and personalized coaching, explore our expert-designed programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/library" className="btn-primary">
                Explore Programs
              </Link>
              <Link href="/login" className="btn-secondary">
                Get Started
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
