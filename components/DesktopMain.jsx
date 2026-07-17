'use client'

import { useEffect, useState } from 'react'
import { Folder, FileText, Code2, BriefcaseBusiness, Mail, ArrowDownRight } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'

const folders = [
  ['about', '01', 'About'],
  ['projects', '02', 'Projects'],
  ['stack', '03', 'Stack'],
  ['experience', '04', 'Experience'],
  ['services', '05', 'Services'],
  ['contact', '06', 'Contact'],
]

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function DesktopMain() {
  const [active, setActive] = useState('')
  const [opening, setOpening] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-35% 0px -50%' }
    )
    folders.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const openFolder = (id) => {
    setOpening(id)
    setTimeout(() => setOpening(''), 450)
    scrollTo(id)
  }

  return (
    <header className="desktop" id="home">
      <AnimatedBackground />

      <div className="statusbar hero-chrome">
        <span className="brand"><i /> .AH</span>
        <span className="status-center">Web Developer &amp; Creative Designer</span>
        <span className="online"><i /> SYSTEM ONLINE</span>
      </div>

      <div className="desktop-content">
        <div className="boot-complete hero-chrome">[ OK ] SYSTEM BOOT COMPLETE</div>

        <div className="hero-kicker">
          <span>AVAILABLE FOR WORK</span>
          <span>EST. 2026</span>
        </div>

        <h1>
          <span className="hero-main">PORTFOLIO</span>
          <span className="hero-exe">.EXE</span>
          <b className="title-caret">_</b>
        </h1>

        <p className="hero-copy">
          <span>I build <em>fast, clean</em> &amp; thoughtful digital experiences for humans on the internet.</span>
        </p>

        <button className="explore hero-action" onClick={() => scrollTo('about')}>
          Explore workspace <ArrowDownRight size={18} />
        </button>

        <div className="folder-grid">
          {folders.map(([id, num, label], i) => (
            <button
              key={id}
              style={{ '--i': i }}
              className={`folder ${active === id ? 'active' : ''} ${opening === id ? 'opening' : ''}`}
              onClick={() => openFolder(id)}
              aria-label={`Open ${label}`}
              aria-current={active === id ? 'location' : undefined}
            >
              <span className="folder-num">{num}</span>
              <Folder fill="currentColor" />
              <b>{label}</b>
              <small>DIR / OPEN</small>
            </button>
          ))}
        </div>
      </div>

      <nav className="dock hero-dock" aria-label="Social links">
        <a data-tip="GitHub" href="https://github.com/CodyAHS02" aria-label="GitHub"><Code2 /></a>
        <a data-tip="LinkedIn" href="https://www.linkedin.com/in/ali-hassan-280878246/" aria-label="LinkedIn"><BriefcaseBusiness /></a>
        <a data-tip="Email" href="mailto:a4ali.hs@gmail.com" aria-label="Email"><Mail /></a>
        <a data-tip="Resume" href="/resume.pdf" download aria-label="Download resume"><FileText /></a>
      </nav>
    </header>
  )
}
