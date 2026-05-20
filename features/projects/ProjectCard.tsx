import { motion } from 'framer-motion'

type ProjectCardProps = {
  title: string
  description?: string
  tags?: string[]
  href?: string
  thumbnail?: string
}

export default function ProjectCard({ title, description, tags = [], href, thumbnail }: ProjectCardProps) {
  const Wrapper: any = href ? 'a' : 'div'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02, rotateX: 0.15 }}
      className="group relative block transform-gpu overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.22)] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#6EE7B7]/20"
      aria-label={title}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(110,231,183,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(124,92,255,0.08),transparent_28%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />

      <Wrapper
        href={href}
        className="relative z-10 flex h-full flex-col justify-between"
      >
        {thumbnail ? (
          <div className="-mx-6 mb-5 overflow-hidden rounded-[28px] border border-white/10 bg-black/20 shadow-inner shadow-black/10">
            <img src={thumbnail} alt={`${title} thumbnail`} className="h-44 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          </div>
        ) : null}

        <div>
          <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
          {description ? (
            <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
          ) : null}
        </div>

        {tags.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-200 backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </Wrapper>

      <div className="absolute inset-x-4 bottom-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
      <div className="absolute inset-0 rounded-[32px] border border-white/10 opacity-60" />
    </motion.div>
  )
}
