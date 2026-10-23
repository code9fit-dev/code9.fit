'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/primitives';

export default function NewProgramPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    focus: '',
    overview: '',
    level: 'intermediate' as const,
    daysPerWeek: 3,
    weeks: 9,
    equipment: 'full-gym' as const,
    goals: ['fat-loss'] as string[],
    purchasable: true,
  });

  const [phase, setPhase] = useState({
    name: 'Phase 1',
    focus: '',
    days: [
      {
        day: 1,
        title: 'Day 1',
        type: 'strength',
        warmup: '',
        exercises: [{ name: '', sets: 3, reps: '10', pattern: '', notes: '' }],
      },
    ],
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhaseChange = (field: string, value: any) => {
    setPhase(prev => ({ ...prev, [field]: value }));
  };

  const addExercise = (dayIdx: number) => {
    const newDays = [...phase.days];
    newDays[dayIdx].exercises.push({ name: '', sets: 3, reps: '10', pattern: '', notes: '' });
    setPhase(prev => ({ ...prev, days: newDays }));
  };

  const removeExercise = (dayIdx: number, exIdx: number) => {
    const newDays = [...phase.days];
    newDays[dayIdx].exercises.splice(exIdx, 1);
    setPhase(prev => ({ ...prev, days: newDays }));
  };

  const updateExercise = (dayIdx: number, exIdx: number, field: string, value: any) => {
    const newDays = [...phase.days];
    newDays[dayIdx].exercises[exIdx] = { ...newDays[dayIdx].exercises[exIdx], [field]: value };
    setPhase(prev => ({ ...prev, days: newDays }));
  };

  const addDay = () => {
    const newDays = [...phase.days];
    newDays.push({
      day: Math.max(...phase.days.map(d => d.day)) + 1,
      title: `Day ${Math.max(...phase.days.map(d => d.day)) + 1}`,
      type: 'strength',
      warmup: '',
      exercises: [{ name: '', sets: 3, reps: '10', pattern: '', notes: '' }],
    });
    setPhase(prev => ({ ...prev, days: newDays }));
  };

  const handleSave = () => {
    // Here you would typically send this to your backend
    console.log('Saving program:', { ...formData, phases: [phase] });
    alert('Program creation is being built! Coming soon.');
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
            <h1 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>Create New Program</h1>
          </div>
          <Link
            href="/admin"
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
            ← Back to Admin
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-8">
          {/* Program Metadata */}
          <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>Program Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Program ID</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => handleInputChange('id', e.target.value)}
                  placeholder="e.g., three-day-fat-loss"
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., 3-Day Fat Loss"
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Focus</label>
                <input
                  type="text"
                  value={formData.focus}
                  onChange={(e) => handleInputChange('focus', e.target.value)}
                  placeholder="One-line focus statement"
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Overview</label>
                <textarea
                  value={formData.overview}
                  onChange={(e) => handleInputChange('overview', e.target.value)}
                  placeholder="Detailed program overview"
                  rows={3}
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Days Per Week</label>
                <input
                  type="number"
                  value={formData.daysPerWeek}
                  onChange={(e) => handleInputChange('daysPerWeek', parseInt(e.target.value))}
                  min="1"
                  max="7"
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Duration (Weeks)</label>
                <input
                  type="number"
                  value={formData.weeks}
                  onChange={(e) => handleInputChange('weeks', parseInt(e.target.value))}
                  min="1"
                  max="52"
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Equipment</label>
                <select
                  value={formData.equipment}
                  onChange={(e) => handleInputChange('equipment', e.target.value)}
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                >
                  <option value="full-gym">Full Gym</option>
                  <option value="home-gym">Home Gym</option>
                  <option value="bodyweight">Bodyweight Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Purchasable</label>
                <select
                  value={formData.purchasable ? 'yes' : 'no'}
                  onChange={(e) => handleInputChange('purchasable', e.target.value === 'yes')}
                  className="w-full p-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Training Phase */}
          <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>Training Phase</h2>
              <button
                onClick={addDay}
                className="px-3 py-1 rounded text-sm font-semibold"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
              >
                + Add Day
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Phase Name</label>
              <input
                type="text"
                value={phase.name}
                onChange={(e) => handlePhaseChange('name', e.target.value)}
                className="w-full p-2 rounded border"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>Phase Focus</label>
              <textarea
                value={phase.focus}
                onChange={(e) => handlePhaseChange('focus', e.target.value)}
                rows={2}
                className="w-full p-2 rounded border"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
              />
            </div>

            {/* Days */}
            <div className="space-y-6">
              {phase.days.map((day, dayIdx) => (
                <div key={dayIdx} className="p-4 rounded" style={{ background: 'var(--surface)', borderLeft: `4px solid var(--accent)` }}>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-dim)' }}>Day</label>
                      <input
                        type="number"
                        value={day.day}
                        onChange={(e) => {
                          const newDays = [...phase.days];
                          newDays[dayIdx].day = parseInt(e.target.value);
                          setPhase(prev => ({ ...prev, days: newDays }));
                        }}
                        className="w-full p-1 rounded border text-sm"
                        style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-dim)' }}>Title</label>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => {
                          const newDays = [...phase.days];
                          newDays[dayIdx].title = e.target.value;
                          setPhase(prev => ({ ...prev, days: newDays }));
                        }}
                        className="w-full p-1 rounded border text-sm"
                        style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-dim)' }}>Type</label>
                      <select
                        value={day.type}
                        onChange={(e) => {
                          const newDays = [...phase.days];
                          newDays[dayIdx].type = e.target.value;
                          setPhase(prev => ({ ...prev, days: newDays }));
                        }}
                        className="w-full p-1 rounded border text-sm"
                        style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                      >
                        <option value="strength">Strength</option>
                        <option value="conditioning">Conditioning</option>
                        <option value="mobility">Mobility</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-dim)' }}>Warmup</label>
                    <input
                      type="text"
                      value={day.warmup}
                      onChange={(e) => {
                        const newDays = [...phase.days];
                        newDays[dayIdx].warmup = e.target.value;
                        setPhase(prev => ({ ...prev, days: newDays }));
                      }}
                      placeholder="e.g., 8-10 min light cardio + dynamic stretches"
                      className="w-full p-1 rounded border text-sm"
                      style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                    />
                  </div>

                  {/* Exercises */}
                  <div className="space-y-2 mb-3">
                    <div className="text-xs font-semibold" style={{ color: 'var(--ink-dim)' }}>Exercises</div>
                    {day.exercises.map((ex, exIdx) => (
                      <div key={exIdx} className="grid grid-cols-5 gap-2">
                        <input
                          type="text"
                          value={ex.name}
                          onChange={(e) => updateExercise(dayIdx, exIdx, 'name', e.target.value)}
                          placeholder="Exercise name"
                          className="col-span-2 p-1 rounded border text-sm"
                          style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                        />
                        <input
                          type="number"
                          value={ex.sets}
                          onChange={(e) => updateExercise(dayIdx, exIdx, 'sets', parseInt(e.target.value))}
                          placeholder="Sets"
                          min="1"
                          className="p-1 rounded border text-sm"
                          style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                        />
                        <input
                          type="text"
                          value={ex.reps}
                          onChange={(e) => updateExercise(dayIdx, exIdx, 'reps', e.target.value)}
                          placeholder="Reps"
                          className="p-1 rounded border text-sm"
                          style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                        />
                        <button
                          onClick={() => removeExercise(dayIdx, exIdx)}
                          className="px-2 py-1 rounded text-xs font-semibold"
                          style={{ background: '#ef4444', color: '#fff' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addExercise(dayIdx)}
                    className="text-sm font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    + Add Exercise
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded font-semibold text-sm"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              Save Program
            </button>
            <Link
              href="/admin"
              className="px-6 py-2 rounded font-semibold text-sm"
              style={{ background: 'var(--panel)', color: 'var(--ink)', border: '1px solid var(--line)' }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
