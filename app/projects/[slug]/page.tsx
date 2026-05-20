import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findProjectBySlug } from '../../../features/projects/projectData'

type ProjectPageProps = {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = findProjectBySlug(params.slug)

  if (!project) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <Link href="/projects" className="text-sm text-slate-400 transition hover:text-slate-100">
          ← Back to project explorer
        </Link>

        <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
          {project.thumbnail ? (
            <div className="overflow-hidden rounded-3xl">
              <img src={project.thumbnail} alt={`${project.title} thumbnail`} className="w-full object-cover" />
            </div>
          ) : null}

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">project detail</p>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{project.details}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
