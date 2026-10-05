'use client';

import { ClientCheckIn } from '@/lib/check-ins/types';

interface CheckInDetailProps {
  checkIn: ClientCheckIn;
}

export function CheckInDetail({ checkIn }: CheckInDetailProps) {
  const weekEndDate = new Date(checkIn.week_of);
  weekEndDate.setDate(weekEndDate.getDate() + 6);

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h3 className="text-lg font-semibold text-stone-900">
          Week of {new Date(checkIn.week_of).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Submitted {new Date(checkIn.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* Summary grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded bg-stone-50 p-4">
          <p className="text-xs font-semibold text-stone-600 uppercase">Sessions</p>
          <p className="text-2xl font-bold text-stone-900 mt-2">{checkIn.sessions_completed}</p>
          {checkIn.missed_reason && <p className="text-xs text-stone-600 mt-1">Reason: {checkIn.missed_reason}</p>}
        </div>

        <div className="rounded bg-stone-50 p-4">
          <p className="text-xs font-semibold text-stone-600 uppercase">Mood</p>
          <p className="text-2xl font-bold text-stone-900 mt-2">{checkIn.mood || '—'}</p>
        </div>

        <div className="rounded bg-stone-50 p-4">
          <p className="text-xs font-semibold text-stone-600 uppercase">Sleep</p>
          <p className="text-2xl font-bold text-stone-900 mt-2">{checkIn.sleep_hours ? `${checkIn.sleep_hours}h` : '—'}</p>
          <p className="text-xs text-stone-600 mt-1">/night</p>
        </div>

        <div className="rounded bg-stone-50 p-4">
          <p className="text-xs font-semibold text-stone-600 uppercase">Status</p>
          <p className={`text-sm font-bold mt-2 ${checkIn.sessions_completed >= 3 ? 'text-green-700' : 'text-amber-700'}`}>
            {checkIn.sessions_completed >= 3 ? '✓ On Track' : '⚠ Below Target'}
          </p>
        </div>
      </div>

      {/* Physical issues alert */}
      {checkIn.physical_issues && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold text-amber-700 uppercase">⚠ Physical Issues</p>
          <p className="text-sm text-amber-900 mt-2">{checkIn.physical_issues}</p>
        </div>
      )}

      {/* Next week's plan */}
      {checkIn.next_week_plan.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-stone-900 mb-3">Next Week's Plan</p>
          <div className="space-y-2">
            {checkIn.next_week_plan.map((session, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded bg-stone-50 p-3">
                <div className="font-semibold text-stone-900">{session.day}</div>
                <div className="text-sm text-stone-600">{session.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {checkIn.notes && (
        <div>
          <p className="text-sm font-semibold text-stone-900 mb-2">Notes</p>
          <p className="text-sm text-stone-700 bg-stone-50 p-3 rounded">{checkIn.notes}</p>
        </div>
      )}
    </div>
  );
}
