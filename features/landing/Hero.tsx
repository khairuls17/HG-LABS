'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const particles = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  delay: Math.random() * 4,
  duration: 8 + Math.random() * 8,
  size: Math.random() * 2 + 1,
  left: Math.random() * 98,
  top: Math.random() * 92,
  blur: Math.random() * 2 + 1,
}))

const heroLines = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 10 + Math.random() * 12,
}))

function HeroParticle() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/12"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            filter: `blur(${particle.blur}px)`,
          }}
          animate={{ y: ['0%', '12%', '0%'] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
      {heroLines.map((line) => (
        <motion.span
          key={line.id}
          className="absolute h-px w-14 bg-white/5"
          style={{ left: `${line.left}%`, top: `${line.id * 8 + 8}%` }}
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: line.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0b0c0f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(110,231,183,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(124,92,255,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-crt-lines opacity-25" />
      <HeroParticle />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-20 pt-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.18)]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#6EE7B7] animate-pulse" />
            midnight coding sanctuary
          </div>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            HG Labs
          </h1>

          <p className="mt-6 max-w-2xl text-3xl leading-tight text-slate-200 sm:text-4xl">
            Midnight coding &<br />
            Weird internet experiments
          </p>

          <p className="mt-8 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            A floating ambient lab built for nocturnal exploration, subtle motion, and cozy digital atmosphere.
          </p>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/terminal" className="glass-button inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/30 hover:bg-white/10">
              Enter lab
            </Link>
            <Link href="/projects" className="text-sm text-slate-400 transition hover:text-slate-100">
              Explore Projects →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
