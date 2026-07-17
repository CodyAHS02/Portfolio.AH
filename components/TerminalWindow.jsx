'use client'

import { useState } from 'react'
import Window from './Window'

const responses = {
  whoami: 'Creative developer turning complex product ideas into clear, human interfaces.',
  skills: 'React | TypeScript | Next.js | Node.js | PostgreSQL | Figma | Git',
  projects: 'Pulseboard / Maison Market / Orbit Rooms / Weatherline / Studio North',
  contact: 'your.email@example.com | github.com/yourusername',
  resume: 'Resume ready -> /resume.pdf',
}

export default function TerminalWindow() {
    const [history, setHistory] = useState([
      ['system', 'DevDesk terminal v1.0'],
      ['cmd', 'help'],
      ['out', 'Commands: whoami, skills, projects, contact, resume, clear'],
    ])
  const [input, setInput] = useState('')

  const run = raw => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setInput('')
    if (cmd === 'clear') return setHistory([])
    setHistory(h => [...h, ['cmd', cmd], ['out', responses[cmd] || `command not found: ${cmd}`]])
  }

  return (
    <Window id="terminal" title="C:\Terminal\visitor" className="terminal-window">
      <div className="terminal">
        <div className="terminal-shortcuts">
          {[...Object.keys(responses), 'clear'].map(c => (
            <button onClick={() => run(c)} key={c}>{c}</button>
          ))}
        </div>
        <div className="terminal-output">
          {history.map(([type, text], i) => (
            <p style={{ '--i': i }} className={type} key={i}>
              {type === 'cmd' && <span>visitor@devdesk:~$ </span>}
              {text}
            </p>
          ))}
        </div>
        <form onSubmit={e => { e.preventDefault(); run(input) }}>
          <label htmlFor="command">visitor@devdesk:~$</label>
          <input
            id="command"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoComplete="off"
            aria-label="Terminal command"
          />
          <span className="cursor">_</span>
        </form>
      </div>
    </Window>
  )
}
