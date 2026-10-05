'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple localhost admin password (change this)
    const adminPassword = 'admin123';

    if (password === adminPassword) {
      // Set a simple flag in localStorage for this session
      localStorage.setItem('admin_session', 'true');
      router.push('/admin');
    } else {
      setError('Incorrect password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Admin Panel</h1>
        <p className="text-sm text-stone-600 mb-6">Localhost only</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="c9-input w-full"
              autoFocus
            />
          </div>

          {error && (
            <div className="rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-accent px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-xs text-stone-600 text-center">
          Default: <code className="bg-stone-100 px-1 py-0.5 rounded">admin123</code>
        </p>
      </div>
    </div>
  );
}
