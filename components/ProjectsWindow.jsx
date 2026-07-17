'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, FileCode2, FolderOpen } from 'lucide-react'
import Window from './Window'
import { projects } from '@/lib/projects'

const filters = ['All', 'React', 'Full Stack', 'UI', 'API']

export default function ProjectsWindow() {
  const [filter, setFilter] = useState('All')
  const [activeId, setActiveId] = useState(projects[0].id)

  const filtered = useMemo(
    () => filter === 'All' ? projects : projects.filter(p => p.category === filter),
    [filter]
  )

  const active = filtered.find(p => p.id === activeId) || filtered[0]
  const activeIndex = filtered.findIndex(p => p.id === active?.id)

  useEffect(() => {
    if (!filtered.some(p => p.id === activeId)) setActiveId(filtered[0]?.id)
  }, [filtered, activeId])

  const move = (direction) => {
    setActiveId(filtered[(activeIndex + direction + filtered.length) % filtered.length].id)
  }

  const selectFilter = (value) => {
    setFilter(value)
    setActiveId(value === 'All' ? projects[0].id : projects.find(p => p.category === value)?.id)
  }

  return (
    <Window id="projects" title="C:\Projects\lab" eyebrow="03 / PROJECT LAB">
      <div className="section-heading">
        <h2>Things I've<br /><em>shipped.</em></h2>
        <p>Open a project file and inspect the build, stack, and deployment log.</p>
      </div>

      <div className="filters" aria-label="Filter projects">
        {filters.map(f => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => selectFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        className="project-lab"
        onKeyDown={e => {
          if (e.key === 'ArrowRight') move(1)
          if (e.key === 'ArrowLeft') move(-1)
        }}
      >
        <nav className="project-explorer" aria-label="Project files">
          <p><FolderOpen /> PROJECT_FILES</p>
          <div>
            {filtered.map((p, i) => (
              <button
                key={p.id}
                className={p.id === active.id ? 'active' : ''}
                onClick={() => setActiveId(p.id)}
                aria-current={p.id === active.id}
              >
                <span><FileCode2 /> {p.name}.app</span>
                <small>0{i + 1}</small>
              </button>
            ))}
          </div>
        </nav>

        <div className="project-stage" key={active.id}>
          <a className="project-preview" href={active.link} target="_blank" rel="noopener noreferrer" style={{ '--project-color': active.color }} title={`Open ${active.name} live site`}>
            <div className="preview-top">
              <span><i /><i /><i /></span>
              <b>preview/{active.id}</b>
              <span className={`build ${active.status.replace(' ', '-')}`}>[ {active.status} ]</span>
            </div>
            <div className="preview-canvas">
              <span className="decor-code">&lt;/&gt;</span>
              <img className="preview-thumb" src={active.image} alt={`${active.name} thumbnail`} loading="lazy" />
            </div>
          </a>

          <div className="project-detail">
            <div>
              <span className="type-label">{active.type}</span>
              <h3>{active.name}</h3>
              <p>{active.desc}</p>
            </div>
            <div className="tech">
              {active.tech.map((t, i) => (
                <span style={{ '--i': i }} key={t}>{t}</span>
              ))}
            </div>
            <div className="lab-actions">
              <a href={active.link} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight /></a>
              {active.repo && (
                <a href={active.repo} target="_blank" rel="noopener noreferrer"><Code2 /> Code</a>
              )}
            </div>
          </div>
        </div>

        <aside className="project-console">
          <div className="console-head">
            <span>DEPLOY.LOG</span>
            <span>LIVE</span>
          </div>
          <div key={active.id}>
            <p>&gt; opening project/{active.name}</p>
            <p>&gt; loading stack: {active.tech.join(', ')}</p>
            <p>&gt; status: {active.status}</p>
            <p>&gt; performance: optimized</p>
            <p className="ready">&gt; ready for preview_</p>
          </div>
          <div className="project-switch">
            <button onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft /></button>
            <span>{activeIndex + 1} / {filtered.length}</span>
            <button onClick={() => move(1)} aria-label="Next project"><ArrowRight /></button>
          </div>
        </aside>
      </div>
    </Window>
  )
}
