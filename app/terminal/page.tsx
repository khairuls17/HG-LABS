import Link from 'next/link'
import Terminal from '../../features/terminal/Terminal'

export default function TerminalPage() {
  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 sm:px-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_25px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-[#6EE7B7]/20 hover:bg-white/10">
                Home
              </Link>
              <Link href="/projects" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-[#6EE7B7]/20 hover:bg-white/10">
                Projects
              </Link>
            </div>
            <p className="text-sm text-slate-400">Terminal Console</p>
          </div>
          <Terminal />
        </div>
      </div>
    </main>
  )
}
