'use client'

import { FormEvent } from 'react'
import TerminalLine from '../../ui/TerminalLine'
import { useTerminalCommands } from '../../lib/useTerminalCommands'

export default function Terminal() {
  const {
    history,
    input,
    setInput,
    handleSubmit,
    handleKeyNavigation,
    cursorVisible,
    inputRef,
  } = useTerminalCommands()

  return (
    <section
      className="mx-auto w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.22)] backdrop-blur-2xl ring-1 ring-white/5 sm:p-8"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Interactive terminal"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">interactive terminal</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">lab console</h2>
        </div>
        <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 sm:block">
          JetBrains Mono
        </div>
      </div>

      <div
        className="min-h-[260px] space-y-4 overflow-y-auto pr-2 text-sm text-slate-300 sm:min-h-[320px]"
        aria-live="polite"
        aria-atomic="true"
      >
        {history.map((entry) => (
          <TerminalLine key={entry.id} prompt={entry.prompt} text={entry.text} variant={entry.variant} />
        ))}
      </div>

      <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); handleSubmit() }} className="mt-6 flex items-center gap-3 rounded-3xl border border-white/10 bg-black/20 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
        <span className="text-slate-400">›</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => handleKeyNavigation(event.key)}
          placeholder="enter command"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 sm:text-base"
          aria-label="Terminal command input"
          spellCheck={false}
        />
        <span className="h-5 w-0.5 bg-slate-200/80 transition-opacity duration-150" style={{ opacity: cursorVisible ? 1 : 0 }} />
      </form>
    </section>
  )
}
