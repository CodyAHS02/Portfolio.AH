'use client'

import { Minus, X } from 'lucide-react'
import Reveal from './Reveal'

export default function Window({ id, title, eyebrow, children, className = '' }) {
  return (
    <Reveal as="section" className={`window ${className}`} id={id}>
      <div className="window-bar">
        <span className="window-path" id={`${id}-title`}>{title}</span>
        <div className="window-actions" aria-hidden="true">
          <Minus size={15} />
          <X size={15} />
        </div>
      </div>
      <div className="window-body">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {children}
      </div>
    </Reveal>
  )
}
