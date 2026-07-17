'use client'

import { useEffect, useState } from 'react'

const lines = [
  'Initializing workspace...',
  'Loading profile.config.js...',
  'Fetching projects.json...',
  'Mounting skill modules...',
  'Connecting GitHub API...',
  'Rendering interactive UI...',
  'Optimizing performance...',
  'Build completed successfully.',
  'Launching Portfolio.exe...',
]

export default function BootLoader({ onDone }) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(lines.length)
      return
    }
    const timer = setInterval(() => setVisible(v => Math.min(v + 1, lines.length)), 260)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (visible === lines.length) {
      const timer = setTimeout(onDone, 700)
      return () => clearTimeout(timer)
    }
  }, [visible, onDone])

  const progress = Math.round((visible / lines.length) * 100)

  return (
    <div className="boot" role="dialog" aria-label="Loading portfolio">
      <button className="skip" onClick={onDone}>Skip intro ↗</button>
      <div className="boot-terminal">
        <div className="boot-dots"><i /><i /><i /></div>
        <p className="boot-command">C:\DEVPORTFOLIO&gt; <b>npm run launch</b></p>
        <div className="boot-lines">
          {lines.slice(0, visible).map((line, i) => (
            <p key={line} className={i > 6 ? 'success' : ''}>{line}</p>
          ))}
        </div>
        <div className="progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-label">
          [{Array(20).fill('█').map((x, i) => (
            <span className={i < (visible / lines.length) * 20 ? 'on' : ''} key={i}>{x}</span>
          ))}] {progress}%
        </p>
        {visible === lines.length && (
          <p className="welcome">Welcome to my DevDesk.<span className="cursor">_</span></p>
        )}
      </div>
    </div>
  )
}
