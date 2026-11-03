'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SetupForm() {
  const token = useSearchParams().get('token');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');

  const requestLink = async () => {
    setStatus('sending');
    setError('');
    const res = await fetch('/api/admin/setup/request', { method: 'POST' }).catch(() => null);
    if (res?.ok) setStatus('sent');
    else {
      setStatus('error');
      setError('Could not send the email. Check the server settings.');
    }
  };

  const setPasswordNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    const res = await fetch('/api/admin/setup/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    }).catch(() => null);
    const body = await res?.json().catch(() => null);
    if (res?.ok && body?.hash) setHash(body.hash);
    else setError(body?.error || 'Something went wrong');
  };

  const shell = (children: React.ReactNode) => (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Admin password</h1>
        {children}
      </div>
    </div>
  );

  if (hash) {
    return shell(
      <div className="space-y-4 text-sm text-stone-700">
        <p>Password set. Add this value to your environment variables as <code>C9_ADMIN_PASSWORD_HASH</code>, then redeploy:</p>
        <pre className="break-all rounded bg-stone-100 p-3 text-xs">{hash}</pre>
        <p>Until you do, the old password will still be the one in use. This link can only be used once.</p>
      </div>
    );
  }

  if (!token) {
    return shell(
      <div className="space-y-4">
        <p className="text-sm text-stone-600">We&apos;ll email a link to the admin address. It expires in 30 minutes.</p>
        {status === 'sent' ? (
          <p className="rounded bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            If the admin email is set up, the link is on its way.
          </p>
        ) : (
          <button
            onClick={requestLink}
            disabled={status === 'sending'}
            className="w-full rounded bg-accent px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Email me a setup link'}
          </button>
        )}
        {error && <p className="text-sm text-red-700">{error}</p>}
      </div>
    );
  }

  return shell(
    <form onSubmit={setPasswordNow} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-stone-900 mb-2">New password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="c9-input w-full" autoComplete="new-password" />
        <p className="text-xs text-stone-500 mt-1">At least 12 characters.</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone-900 mb-2">Confirm password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="c9-input w-full" autoComplete="new-password" />
      </div>
      {error && <div className="rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}
      <button type="submit" className="w-full rounded bg-accent px-4 py-2 font-semibold text-white hover:opacity-90">
        Set password
      </button>
    </form>
  );
}

export default function AdminSetupPage() {
  return (
    <Suspense>
      <SetupForm />
    </Suspense>
  );
}
