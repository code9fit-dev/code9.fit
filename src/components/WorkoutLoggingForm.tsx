'use client';

import { useEffect, useState } from 'react';

interface PlannedExercise {
  name: string;
  sets?: number;
  reps?: string;
  weight?: number;
  duration?: number;
  notes?: string;
}

interface ExerciseLog {
  name: string;
  planned: PlannedExercise;
  actual: {
    sets?: number;
    reps?: string;
    weight?: number;
    notes?: string;
  };
}

interface PostWorkoutFeelings {
  energyLevel: number; // 1-10
  soreness: number; // 1-10
  mood: number; // 1-10
  sleepHours: number; // 0-12
  sleepQuality: number; // 1-10
}

interface WorkoutLoggingFormProps {
  sessionId: string;
  programId: string;
  onComplete?: () => void;
  onCancel?: () => void;
}

interface PlannedWorkout {
  id: string;
  dayTitle: string;
  exercises: PlannedExercise[];
  isRestDay: boolean;
  warmup?: string;
  cooldown?: string;
}

/** WorkoutLoggingForm displays planned workout and logs actual performance + post-workout feelings. */
export function WorkoutLoggingForm({
  sessionId,
  programId,
  onComplete,
  onCancel,
}: WorkoutLoggingFormProps) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plannedWorkout, setPlannedWorkout] = useState<PlannedWorkout | null>(null);

  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
  const [feelings, setFeelings] = useState<PostWorkoutFeelings>({
    energyLevel: 5,
    soreness: 5,
    mood: 5,
    sleepHours: 7,
    sleepQuality: 5,
  });

  // Fetch planned workout on mount
  useEffect(() => {
    const fetchPlannedWorkout = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the planned workout for this session
        const response = await fetch(`/api/workouts/session/${sessionId}?programId=${programId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch planned workout');
        }

        const data: PlannedWorkout = await response.json();
        setPlannedWorkout(data);

        // Initialize exercise logs with planned data
        const initialLogs: ExerciseLog[] = data.exercises.map((ex) => ({
          name: ex.name,
          planned: ex,
          actual: {},
        }));
        setExerciseLogs(initialLogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workout');
      } finally {
        setLoading(false);
      }
    };

    fetchPlannedWorkout();
  }, [sessionId, programId]);

  // Update exercise log for a specific field
  const updateExerciseLog = (
    index: number,
    field: 'sets' | 'reps' | 'weight' | 'notes',
    value: string | number | undefined
  ) => {
    const updated = [...exerciseLogs];
    updated[index] = {
      ...updated[index],
      actual: {
        ...updated[index].actual,
        [field]: value,
      },
    };
    setExerciseLogs(updated);
  };

  // Update post-workout feelings
  const updateFeeling = (field: keyof PostWorkoutFeelings, value: number) => {
    setFeelings({ ...feelings, [field]: value });
  };

  // Validate required fields
  const validateForm = (): boolean => {
    if (!plannedWorkout || exerciseLogs.length === 0) {
      setError('Missing workout data');
      return false;
    }

    // Check that at least sets or reps are logged for each exercise
    for (let i = 0; i < exerciseLogs.length; i++) {
      const log = exerciseLogs[i];
      if (log.actual.sets === undefined && log.actual.reps === undefined) {
        setError(`Exercise "${log.name}" requires at least sets or reps`);
        return false;
      }
    }

    return true;
  };

  // Submit the workout log
  const handleSubmit = async (skipRestDay?: boolean) => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError(null);

      // Format payload to match API expectations
      const payload = {
        exercises: exerciseLogs
          .filter((log) => log.actual.sets !== undefined || log.actual.reps !== undefined)
          .map((log) => ({
            name: log.name,
            actual_sets: log.actual.sets,
            actual_reps: log.actual.reps,
            actual_weight: log.actual.weight,
            notes: log.actual.notes,
          })),
        energy_level: feelings.energyLevel,
        soreness: feelings.soreness,
        mood: feelings.mood,
        sleep_hours: feelings.sleepHours,
        sleep_quality: feelings.sleepQuality,
      };

      const response = await fetch(`/api/workouts/session/${sessionId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save workout');
      }

      onComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save workout');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-line bg-panel p-8 text-center">
        <p className="text-ink-dim">Loading workout...</p>
      </div>
    );
  }

  if (!plannedWorkout) {
    return (
      <div className="rounded-lg border border-line bg-panel p-8">
        <p className="text-sm text-safety">Error: Could not load planned workout</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-lg border border-line bg-panel p-8">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">
          {plannedWorkout.dayTitle}
        </h2>
        <p className="mt-2 text-sm text-ink-dim">
          {plannedWorkout.isRestDay
            ? 'Rest day — optional logging'
            : 'Log your actual performance below'}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-safety fill-safety p-4">
          <p className="text-sm font-semibold text-safety">{error}</p>
        </div>
      )}

      {/* Planned workout display */}
      {plannedWorkout.warmup && (
        <div className="rounded border border-line bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Warm-up
          </p>
          <p className="mt-2 text-sm text-ink">{plannedWorkout.warmup}</p>
        </div>
      )}

      {/* Exercise logging section */}
      <div className="space-y-6">
        <h3 className="font-display text-lg font-semibold text-ink">Exercises</h3>

        {exerciseLogs.length === 0 ? (
          <p className="text-sm text-ink-dim italic">No exercises planned for today</p>
        ) : (
          <div className="space-y-4">
            {exerciseLogs.map((log, index) => (
              <div
                key={index}
                className="rounded border border-line bg-surface p-5 space-y-4"
              >
                {/* Exercise name and planned details */}
                <div>
                  <h4 className="font-semibold text-ink">{log.name}</h4>
                  <div className="mt-2 grid grid-cols-3 gap-3 text-xs text-ink-dim">
                    {log.planned.sets && (
                      <div>
                        <p className="uppercase tracking-wide">Planned Sets</p>
                        <p className="mt-1 font-semibold text-ink">{log.planned.sets}</p>
                      </div>
                    )}
                    {log.planned.reps && (
                      <div>
                        <p className="uppercase tracking-wide">Planned Reps</p>
                        <p className="mt-1 font-semibold text-ink">{log.planned.reps}</p>
                      </div>
                    )}
                    {log.planned.duration && (
                      <div>
                        <p className="uppercase tracking-wide">Planned Duration</p>
                        <p className="mt-1 font-semibold text-ink">
                          {log.planned.duration}s
                        </p>
                      </div>
                    )}
                  </div>
                  {log.planned.notes && (
                    <p className="mt-2 text-xs text-ink-dim">{log.planned.notes}</p>
                  )}
                </div>

                {/* Actual logging inputs */}
                <div className="border-t border-line pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                    Actual Performance
                  </p>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {/* Sets input */}
                    <label className="flex flex-col">
                      <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-dim">
                        Sets
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={log.actual.sets ?? ''}
                        onChange={(e) =>
                          updateExerciseLog(
                            index,
                            'sets',
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        placeholder="e.g. 3"
                        className="c9-input"
                      />
                    </label>

                    {/* Reps input */}
                    <label className="flex flex-col">
                      <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-dim">
                        Reps
                      </span>
                      <input
                        type="text"
                        value={log.actual.reps ?? ''}
                        onChange={(e) =>
                          updateExerciseLog(index, 'reps', e.target.value || undefined)
                        }
                        placeholder="e.g. 10-12"
                        className="c9-input"
                      />
                    </label>

                    {/* Weight input */}
                    <label className="flex flex-col">
                      <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-dim">
                        Weight (lbs)
                      </span>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={log.actual.weight ?? ''}
                        onChange={(e) =>
                          updateExerciseLog(
                            index,
                            'weight',
                            e.target.value ? parseFloat(e.target.value) : undefined
                          )
                        }
                        placeholder="e.g. 185"
                        className="c9-input"
                      />
                    </label>
                  </div>

                  {/* Exercise notes */}
                  <label className="mt-3 flex flex-col">
                    <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-dim">
                      Notes (optional)
                    </span>
                    <textarea
                      value={log.actual.notes ?? ''}
                      onChange={(e) =>
                        updateExerciseLog(index, 'notes', e.target.value || undefined)
                      }
                      placeholder="e.g. felt strong, struggled on last set"
                      rows={2}
                      className="c9-input"
                    />
                  </label>
                </div>

                {/* Visual diff */}
                {(log.actual.sets !== undefined ||
                  log.actual.reps !== undefined ||
                  log.actual.weight !== undefined) && (
                  <div className="border-t border-line pt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                      Comparison
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
                      {log.planned.sets && log.actual.sets !== undefined && (
                        <div className="rounded fill-panel p-2">
                          <p className="text-ink-dim">Sets</p>
                          <p className="mt-1 font-semibold text-ink">
                            {log.planned.sets} → {log.actual.sets}
                            {log.actual.sets > log.planned.sets && (
                              <span className="ml-1 text-accent">✓</span>
                            )}
                            {log.actual.sets < log.planned.sets && (
                              <span className="ml-1 text-safety">−</span>
                            )}
                          </p>
                        </div>
                      )}
                      {log.planned.reps && log.actual.reps !== undefined && (
                        <div className="rounded fill-panel p-2">
                          <p className="text-ink-dim">Reps</p>
                          <p className="mt-1 font-semibold text-ink">{log.actual.reps}</p>
                        </div>
                      )}
                      {log.planned.duration && (
                        <div className="rounded fill-panel p-2">
                          <p className="text-ink-dim">Duration</p>
                          <p className="mt-1 font-semibold text-ink">
                            {log.planned.duration}s
                          </p>
                        </div>
                      )}
                      {log.actual.weight !== undefined && (
                        <div className="rounded fill-panel p-2">
                          <p className="text-ink-dim">Weight</p>
                          <p className="mt-1 font-semibold text-ink">{log.actual.weight} lbs</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {plannedWorkout.cooldown && (
        <div className="rounded border border-line bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Cool-down
          </p>
          <p className="mt-2 text-sm text-ink">{plannedWorkout.cooldown}</p>
        </div>
      )}

      {/* Post-workout feelings section */}
      <div className="space-y-6 border-t border-line pt-6">
        <h3 className="font-display text-lg font-semibold text-ink">How are you feeling?</h3>

        {/* Energy level slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-ink">Energy Level</label>
            <span className="text-sm font-semibold text-accent">{feelings.energyLevel}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={feelings.energyLevel}
            onChange={(e) => updateFeeling('energyLevel', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Soreness slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-ink">Soreness</label>
            <span className="text-sm font-semibold text-accent">{feelings.soreness}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={feelings.soreness}
            onChange={(e) => updateFeeling('soreness', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Mood slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-ink">Mood</label>
            <span className="text-sm font-semibold text-accent">{feelings.mood}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={feelings.mood}
            onChange={(e) => updateFeeling('mood', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Sleep hours input */}
        <label className="flex flex-col">
          <span className="mb-2 text-sm font-semibold text-ink">Sleep Hours (last night)</span>
          <input
            type="number"
            step="0.5"
            min="0"
            max="12"
            value={feelings.sleepHours || ''}
            onChange={(e) =>
              updateFeeling('sleepHours', e.target.value ? parseFloat(e.target.value) : 0)
            }
            placeholder="e.g. 7.5"
            className="c9-input"
          />
        </label>

        {/* Sleep quality slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-ink">Sleep Quality</label>
            <span className="text-sm font-semibold text-accent">{feelings.sleepQuality}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={feelings.sleepQuality}
            onChange={(e) => updateFeeling('sleepQuality', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 border-t border-line pt-6 md:flex-row">
        <button
          onClick={() => handleSubmit(false)}
          disabled={submitting}
          className="btn-primary flex-1"
        >
          {submitting ? 'Saving...' : 'Log Workout'}
        </button>

        {plannedWorkout.isRestDay && (
          <button
            onClick={() => handleSubmit(true)}
            disabled={submitting}
            className="btn-secondary flex-1"
          >
            {submitting ? 'Saving...' : 'Skip Rest Day'}
          </button>
        )}

        <button
          onClick={onCancel}
          disabled={submitting}
          className="btn-back flex-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
