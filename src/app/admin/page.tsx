'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { library } from '@/data/workout-library';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'config'>('overview');

  useEffect(() => {
    // Check if user has admin session
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) {
      router.push('/admin/login');
    } else {
      setIsAuthed(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-stone-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-900">Admin Dashboard</h1>
          <div className="flex gap-3">
            <a
              href="/"
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-300 px-3 py-1.5 rounded hover:bg-stone-50"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-stone-200 bg-white px-6">
        <div className="mx-auto max-w-7xl flex gap-6">
          {['overview', 'programs', 'config'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-accent text-stone-900'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <p className="text-xs font-semibold text-stone-600 uppercase">Total Programs</p>
                <p className="text-3xl font-bold text-stone-900 mt-2">{library.length}</p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <p className="text-xs font-semibold text-stone-600 uppercase">Environment</p>
                <p className="text-lg font-bold text-stone-900 mt-2">localhost (dev)</p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <p className="text-xs font-semibold text-stone-600 uppercase">Status</p>
                <p className="text-lg font-bold text-green-700 mt-2">✓ Ready</p>
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  href="/library"
                  className="block rounded bg-stone-100 px-4 py-3 font-semibold text-stone-900 hover:bg-stone-200"
                >
                  → View Library (with blur)
                </Link>
                <Link
                  href="/admin/programs"
                  className="block rounded bg-accent px-4 py-3 font-semibold text-white hover:opacity-90"
                >
                  → View All Programs (no blur)
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              All Programs ({library.length})
            </h2>
            <div className="space-y-3">
              {library.map((program) => (
                <div key={program.meta.id} className="rounded-lg border border-stone-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-stone-900">{program.meta.title}</h3>
                      <p className="text-xs text-stone-600 mt-1">{program.focus}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-xs bg-stone-100 px-2 py-1 rounded">{program.meta.level}</span>
                        <span className="text-xs bg-stone-100 px-2 py-1 rounded">{program.meta.daysPerWeek}-day/week</span>
                        <span className="text-xs bg-stone-100 px-2 py-1 rounded">{program.meta.weeks} weeks</span>
                      </div>
                    </div>
                    <Link
                      href={`/admin/programs/${program.meta.id}`}
                      className="rounded bg-accent px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">Environment</h2>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between py-2 border-b border-stone-200">
                  <span className="text-stone-600">NODE_ENV</span>
                  <span className="text-stone-900">{process.env.NODE_ENV || 'development'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-200">
                  <span className="text-stone-600">NEXT_PUBLIC_SUPABASE_URL</span>
                  <span className="text-stone-900">{process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Configured' : '✗ Missing'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-stone-600">ANTHROPIC_API_KEY</span>
                  <span className="text-stone-900">{process.env.ANTHROPIC_API_KEY ? '✓ Configured' : '✗ Missing'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">Library Stats</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-stone-200">
                  <span className="text-stone-600">Total programs</span>
                  <span className="text-stone-900 font-semibold">{library.length}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-200">
                  <span className="text-stone-600">Levels</span>
                  <span className="text-stone-900 font-semibold">
                    {new Set(library.map(p => p.meta.level)).size}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-stone-600">Training days</span>
                  <span className="text-stone-900 font-semibold">
                    {new Set(library.map(p => p.meta.daysPerWeek)).size} variants
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
