export default function CheckInTemplatesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-stone-900">Check-In Templates</h1>
          <p className="text-sm text-stone-600">Free printable forms for tracking your progress</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8 space-y-6">
        {/* Intro */}
        <div className="rounded-lg border border-stone-200 bg-white p-6">
          <p className="text-stone-900">
            Print these templates to track your workouts and check-ins between digital submissions. Fill them out by hand or digitally,
            then share highlights with your coach.
          </p>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weekly Check-In 3 Sessions */}
          <div className="rounded-lg border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-accent text-white px-6 py-4">
              <h2 className="font-semibold">Weekly Check-In (3 Sessions)</h2>
              <p className="text-sm text-white/90">For clients on 3-session/week programs</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-stone-600">
                Track sessions completed, mood, sleep, physical issues, and plan next week's workouts.
              </p>
              <a
                href="/templates/weekly-check-in-3.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded bg-accent text-white px-4 py-2 text-sm font-semibold text-center hover:opacity-90"
              >
                Open & Print
              </a>
            </div>
          </div>

          {/* Weekly Check-In 4 Sessions */}
          <div className="rounded-lg border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-accent text-white px-6 py-4">
              <h2 className="font-semibold">Weekly Check-In (4 Sessions)</h2>
              <p className="text-sm text-white/90">For clients on 4-session/week programs</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-stone-600">
                Same as 3-session but with space for 4 workout days.
              </p>
              <a
                href="/templates/weekly-check-in-4.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded bg-accent text-white px-4 py-2 text-sm font-semibold text-center hover:opacity-90"
              >
                Open & Print
              </a>
            </div>
          </div>

          {/* Session Tracker */}
          <div className="rounded-lg border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-accent text-white px-6 py-4">
              <h2 className="font-semibold">Session Tracker</h2>
              <p className="text-sm text-white/90">Detailed logging per workout</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-stone-600">
                Log exercises, sets, reps, weight, and RPE. Capture wins and notes for next time.
              </p>
              <a
                href="/templates/session-tracker.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded bg-accent text-white px-4 py-2 text-sm font-semibold text-center hover:opacity-90"
              >
                Open & Print
              </a>
            </div>
          </div>

          {/* Check-In Guide */}
          <div className="rounded-lg border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-accent text-white px-6 py-4">
              <h2 className="font-semibold">How to Use Check-Ins</h2>
              <p className="text-sm text-white/90">Instructions & ground rules</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-stone-600">
                Learn what each question is really asking and how your coach will use your responses.
              </p>
              <a
                href="/templates/check-in-guide.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded bg-accent text-white px-4 py-2 text-sm font-semibold text-center hover:opacity-90"
              >
                Open & Print
              </a>
            </div>
          </div>
        </div>

        {/* How to print section */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="font-semibold text-blue-900 mb-3">How to Print to PDF</h3>
          <ol className="space-y-2 text-sm text-blue-900 list-decimal list-inside">
            <li>Click "Open & Print" on any template</li>
            <li>Use your browser's print function (Cmd+P or Ctrl+P)</li>
            <li>Select "Save as PDF" as your printer</li>
            <li>Set margins to "None" for full-page layout</li>
            <li>Save the PDF and print whenever you need a fresh form</li>
          </ol>
        </div>

        {/* Tips section */}
        <div className="rounded-lg border border-stone-200 bg-white p-6">
          <h3 className="font-semibold text-stone-900 mb-3">Tips for Getting the Most Out of Check-Ins</h3>
          <ul className="space-y-2 text-sm text-stone-700 list-disc list-inside">
            <li>Fill in your weekly check-in within 24 hours of your last session—memory is fresh</li>
            <li>Be honest about barriers. "No time" tells your coach something different than "just didn't want to"</li>
            <li>Use the session tracker to spot patterns (form breakdown, consistent effort, progression)</li>
            <li>Decide next week's workouts on check-in day, not the day of—you're more likely to stick to it</li>
            <li>Keep every sheet. The pattern across weeks matters more than any single session</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
