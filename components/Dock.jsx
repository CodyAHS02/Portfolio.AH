'use client'

import { ArrowUp, Download, Code2, BriefcaseBusiness, Mail } from 'lucide-react'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <Reveal as="footer" className="site-footer">
      <div>
        <span>DEV/DESK</span>
        <p>Designed with intent.<br />Built with curiosity.</p>
      </div>
      <div className="footer-links">
        <a href="https://github.com/CodyAHS02"><Code2 /> GitHub</a>
        <a href="https://www.linkedin.com/in/ali-hassan-280878246/"><BriefcaseBusiness /> LinkedIn</a>
        <a href="mailto:a4ali.hs@gmail.com"><Mail /> Email</a>
      </div>
      <a className="resume" href="/Resume.jpg" download><Download /> Download resume</a>
      <div className="footer-status">
        <span><i /> system online</span>
        <span>last updated 2026</span>
        <span>available for work</span>
      </div>
      <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
        <ArrowUp />
      </button>
      <small>(c) 2026 [Ali Hassan] | LOCAL TIME: PKT</small>
    </Reveal>
  )
}
