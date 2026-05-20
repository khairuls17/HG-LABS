import ProjectsList from '../../features/projects/ProjectsList'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 sm:px-10">
        <ProjectsList />
      </div>
    </main>
  )
}
