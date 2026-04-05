'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    id: 'bliff',
    name: 'Bliff',
    tagline: 'AI interview coach for developers',
    description:
      'A conversational AI assistant that helps software engineers prepare for technical interviews. Covers system design, DSA, behavioral rounds, and role-specific questions — with real-time feedback and session history.',
    status: 'In Progress',
    statusColor: '#f59e0b',
    tags: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    github: null, // private for now
    demo: null,
  },
]

export function PersonalProjects() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 text-3xl font-bold text-[var(--color-text-primary)]">
            Personal Projects
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Building in public — things I make outside of work
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-6 transition-shadow hover:shadow-lg"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {project.name}
                </h3>
                <span
                  className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${project.statusColor}22`,
                    color: project.statusColor,
                  }}
                >
                  {project.status}
                </span>
              </div>

              <p className="mb-2 text-xs font-medium text-[var(--color-brand-accent)]">
                {project.tagline}
              </p>

              <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-bg-border)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    GitHub →
                  </a>
                ) : (
                  <span className="text-xs text-[var(--color-text-muted)]">
                    Repo private · coming soon
                  </span>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[var(--color-brand-accent)] transition-colors hover:text-[var(--color-brand-accent-hover)]"
                  >
                    Live demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
