'use client'

import { useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import Window from './Window'

export default function ContactWindow() {
  const [status, setStatus] = useState('ready')

  const submit = e => {
    e.preventDefault()
    setStatus('compiling')
    const form = e.currentTarget
    setTimeout(() => { setStatus('sent'); form.reset() }, 900)
  }

  return (
    <Window id="contact" title="C:\Inbox\new_message" eyebrow="06 / SAY HELLO">
      <div className="contact-layout">
        <div className="contact-copy">
          <h2>Have a good<br />problem to <em>solve?</em></h2>
          <p>Tell me what you're building. I'm always happy to talk through an ambitious idea, a stubborn interface, or your next launch.</p>
          <a href="mailto:your.email@example.com"><Mail /> your.email@example.com</a>
          <div className="availability"><i /> CURRENTLY ACCEPTING NEW PROJECTS</div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          {[['name', '01 / YOUR NAME', 'Jane Smith'], ['email', '02 / EMAIL ADDRESS', 'jane@company.com']].map(([id, label, placeholder], i) => (
            <div style={{ '--i': i }} key={id}>
              <label htmlFor={id}>{label}</label>
              <input id={id} type={id === 'email' ? 'email' : 'text'} required placeholder={placeholder} />
            </div>
          ))}
          <div style={{ '--i': 2 }}>
            <label htmlFor="message">03 / YOUR MESSAGE</label>
            <textarea id="message" required rows="5" placeholder="A few words about your project..." />
          </div>
          <button disabled={status === 'compiling'} type="submit">
            {status === 'compiling' ? 'Compiling message...' : status === 'sent' ? 'Message compiled successfully' : 'Send message'} <ArrowUpRight />
          </button>
          <p className="compiler-status" role="status">
            status: {status === 'ready' ? 'ready_to_send' : status === 'compiling' ? 'compiling...' : 'message_sent'}
          </p>
        </form>
      </div>
    </Window>
  )
}
