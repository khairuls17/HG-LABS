'use client'

import Pomodoro from './Pomodoro'

export default function FocusRoom() {
  return (
    <section className="mx-auto w-full max-w-4xl rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">focus room</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Focus Room</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Pomodoro />
        </div>

        <div>
          <div className="rounded-2xl bg-black/40 p-4">
            <h3 className="text-sm font-semibold text-white">Session notes</h3>
            <p className="mt-2 text-sm text-slate-300">Keep a quick note here for what you're focusing on this session.</p>
            <textarea aria-label="Session notes" className="mt-3 w-full rounded-md bg-transparent p-2 text-sm text-slate-200 outline-none placeholder:text-slate-500" placeholder="Write your focus goal..." />
          </div>
        </div>
      </div>
    </section>
  )
}
