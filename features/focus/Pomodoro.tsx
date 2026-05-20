'use client'

import { useEffect, useRef, useState } from 'react'

type PomodoroProps = {
  initialMinutes?: number
}

export default function Pomodoro({ initialMinutes = 25 }: PomodoroProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((s) => Math.max(0, s - 1))
      }, 1000)
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [running])

  useEffect(() => {
    if (secondsLeft === 0) setRunning(false)
  }, [secondsLeft])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const start = () => setRunning(true)
  const pause = () => setRunning(false)
  const reset = () => setSecondsLeft(initialMinutes * 60)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-2xl bg-black/40 px-6 py-4 text-center">
        <div className="text-4xl font-mono tabular-nums text-white">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
        <div className="mt-2 text-sm text-slate-300">Focus session</div>
      </div>

      <div className="flex items-center gap-3">
        {!running ? (
          <button onClick={start} className="rounded-full bg-[#6EE7B7] px-4 py-2 text-sm font-medium text-black">Start</button>
        ) : (
          <button onClick={pause} className="rounded-full bg-white/6 px-4 py-2 text-sm font-medium text-white">Pause</button>
        )}
        <button onClick={reset} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">Reset</button>
      </div>
    </div>
  )
}
