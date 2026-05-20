'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from './projectData'

export default function ProjectsList() {
  const [filter, setFilter] = useState<string | null>(null)

  const tags = useMemo(() => {
    const s = new Set<string>()
    projects.forEach((p) => p.tags?.forEach((t: string) => s.add(t)))
    return Array.from(s)
  }, [])

  const visible = projects.filter((p) => (filter ? p.tags?.includes(filter) : true))

  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#090a0d]/90 px-6 py-16 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,_rgba(110,231,183,0.12),transparent_30%)] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom,_rgba(124,92,255,0.12),transparent_30%)] opacity-60 blur-3xl" />

      <div className="relative z-10 mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Project Explorer</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Floating lab projects</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Explore the midnight experiments and interface prototypes that shape this ambient coding sanctuary.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className={`rounded-full border px-4 py-2 text-sm transition ${filter === null ? 'border-[#6EE7B7]/20 bg-[#6EE7B7]/10 text-white shadow-[0_15px_45px_rgba(110,231,183,0.1)]' : 'border-white/10 bg-white/5 text-slate-200 hover:border-[#6EE7B7]/20 hover:bg-[#ffffff]/10'}`}
            onClick={() => setFilter(null)}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              className={`rounded-full border px-4 py-2 text-sm transition ${filter === t ? 'border-[#6EE7B7]/20 bg-[#6EE7B7]/10 text-white shadow-[0_15px_45px_rgba(110,231,183,0.1)]' : 'border-white/10 bg-white/5 text-slate-200 hover:border-[#6EE7B7]/20 hover:bg-[#ffffff]/10'}`}
              onClick={() => setFilter(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
            <ProjectCard title={p.title} description={p.description} tags={p.tags} href={p.href} thumbnail={p.thumbnail} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
