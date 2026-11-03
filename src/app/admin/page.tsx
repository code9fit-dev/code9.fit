'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { library } from '@/data/workout-library';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'checkins' | 'programs' | 'users' | 'config'>('overview');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className="p-3 rounded text-sm font-semibold text-center cursor-pointer transition-all"
          style={{
            background: isToday ? 'var(--accent)' : 'var(--panel)',
            color: isToday ? 'var(--on-accent)' : 'var(--ink)',
            border: `1px solid ${isToday ? 'var(--accent)' : 'var(--line)'}`
          }}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }} data-theme="signature">
      {/* Header */}
      <header className="px-6 py-4" style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/code9-logo-cream-transparent.svg"
              alt="Code9 Admin"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>Admin Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/library"
              className="text-xs font-semibold px-3 py-1.5 rounded transition-all"
              style={{
                color: 'var(--ink)',
                border: '1px solid var(--line)',
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--on-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--ink)';
              }}
            >
              📚 Programs
            </Link>
            <a
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded transition-all"
              style={{
                color: 'var(--ink)',
                border: '1px solid var(--line)',
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--on-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--ink)';
              }}
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold transition-colors"
              style={{ color: 'var(--ink-dim)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--ink-dim)';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6" style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
        <div className="mx-auto max-w-7xl flex gap-6">
          {['overview', 'checkins', 'programs', 'users', 'config'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className="px-4 py-3 font-semibold border-b-2 transition-colors text-sm"
              style={{
                borderColor: activeTab === tab ? 'var(--accent)' : 'transparent',
                color: activeTab === tab ? 'var(--ink)' : 'var(--ink-dim)'
              }}
            >
              {tab === 'checkins' ? 'Check-Ins' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>Total Programs</p>
                <p className="text-3xl font-bold mt-2" style={{ color: 'var(--accent)' }}>{library.length}</p>
              </div>
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>Active Users</p>
                <p className="text-3xl font-bold mt-2" style={{ color: 'var(--accent)' }}>12</p>
              </div>
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>Check-Ins This Week</p>
                <p className="text-3xl font-bold mt-2" style={{ color: 'var(--accent)' }}>8</p>
              </div>
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>Status</p>
                <p className="text-lg font-bold mt-2" style={{ color: '#4ade80' }}>✓ Ready</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link
                  href="/library"
                  className="block rounded px-4 py-3 font-semibold transition-all"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  → View Library
                </Link>
                <Link
                  href="/admin/workout-builder"
                  className="block rounded px-4 py-3 font-semibold transition-all"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  ⚡ Create New Workout
                </Link>
                <button
                  onClick={() => setActiveTab('checkins')}
                  className="block rounded px-4 py-3 font-semibold transition-all"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  → View Check-Ins Calendar
                </button>
                <button
                  onClick={() => setActiveTab('programs')}
                  className="block rounded px-4 py-3 font-semibold transition-all"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  → Manage Programs
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className="block rounded px-4 py-3 font-semibold transition-all"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  → Manage Users
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CHECK-INS TAB */}
        {activeTab === 'checkins' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Check-In Calendar</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="px-3 py-1 rounded text-sm font-semibold transition-all"
                  style={{ background: 'var(--panel)', color: 'var(--ink)' }}
                >
                  ← Prev
                </button>
                <span style={{ color: 'var(--ink)' }} className="px-3 py-1 font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="px-3 py-1 rounded text-sm font-semibold transition-all"
                  style={{ background: 'var(--panel)', color: 'var(--ink)' }}
                >
                  Next →
                </button>
              </div>
            </div>

            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs font-semibold" style={{ color: 'var(--ink-dim)' }}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </div>

            {/* Recent Check-Ins */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>Recent Check-Ins</h3>
              <div className="space-y-3">
                {[
                  { user: 'John Doe', date: 'Today', status: 'Completed' },
                  { user: 'Jane Smith', date: 'Yesterday', status: 'Completed' },
                  { user: 'Mike Johnson', date: '3 days ago', status: 'Pending' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded" style={{ background: 'var(--surface)' }}>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--ink)' }}>{item.user}</p>
                      <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>{item.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${item.status === 'Completed' ? '' : 'opacity-60'}`} style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROGRAMS TAB */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Programs ({library.length})</h2>
              <div className="flex gap-2">
                <Link
                  href="/admin/library"
                  className="px-4 py-2 rounded font-semibold text-sm transition-all"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  Open all programs
                </Link>
                <Link
                  href="/admin/workout-builder"
                  className="px-4 py-2 rounded font-semibold text-sm transition-all"
                  style={{ border: '1px solid var(--line)', color: 'var(--ink)' }}
                >
                  + Create workout
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--ink)' }}>User Management</h2>

            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <div className="space-y-3">
                {[
                  { name: 'John Doe', email: 'john@example.com', program: 'Push/Pull/Legs', status: 'Active' },
                  { name: 'Jane Smith', email: 'jane@example.com', program: 'Full Body', status: 'Active' },
                  { name: 'Mike Johnson', email: 'mike@example.com', program: 'Upper/Lower', status: 'Paused' },
                  { name: 'Sarah Williams', email: 'sarah@example.com', program: 'Push/Pull/Legs', status: 'Active' },
                  { name: 'Tom Brown', email: 'tom@example.com', program: 'Full Body', status: 'Inactive' },
                ].map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded" style={{ background: 'var(--surface)', borderBottom: idx < 4 ? '1px solid var(--line)' : 'none' }}>
                    <div className="flex-1">
                      <p className="font-semibold" style={{ color: 'var(--ink)' }}>{user.name}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>{user.email}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--accent)' }}>{user.program}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded`} style={{ background: 'var(--accent)', color: 'var(--on-accent)', opacity: user.status === 'Active' ? 1 : 0.6 }}>
                      {user.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONFIG TAB */}
        {activeTab === 'config' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Configuration</h2>

            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>Environment</h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--line)' }}>
                  <span style={{ color: 'var(--ink-dim)' }}>NODE_ENV</span>
                  <span style={{ color: 'var(--ink)' }}>{process.env.NODE_ENV || 'development'}</span>
                </div>
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--line)' }}>
                  <span style={{ color: 'var(--ink-dim)' }}>NEXT_PUBLIC_SUPABASE_URL</span>
                  <span style={{ color: process.env.NEXT_PUBLIC_SUPABASE_URL ? '#4ade80' : '#ef4444' }}>{process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Configured' : '✗ Missing'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span style={{ color: 'var(--ink-dim)' }}>ANTHROPIC_API_KEY</span>
                  <span style={{ color: process.env.ANTHROPIC_API_KEY ? '#4ade80' : '#ef4444' }}>{process.env.ANTHROPIC_API_KEY ? '✓ Configured' : '✗ Missing'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>Library Statistics</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--line)' }}>
                  <span style={{ color: 'var(--ink-dim)' }}>Total Programs</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{library.length}</span>
                </div>
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--line)' }}>
                  <span style={{ color: 'var(--ink-dim)' }}>Difficulty Levels</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{new Set(library.map(p => p.meta.level)).size}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span style={{ color: 'var(--ink-dim)' }}>Training Variations</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{new Set(library.map(p => p.meta.daysPerWeek)).size} variants</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
