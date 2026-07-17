'use client'

import { useRef, useState, useEffect } from 'react'
import { ArrowDownRight } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import { projects } from '@/lib/projects'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const SECRET_CODE = 'i am impressed'

const MESSAGES = [
  null,
  "Don't touch me!",
  "Please don't bother me.",
  "Don't touch me!!",
  "Last warning. Don't touch me again.",
]

export default function Desktop() {
  const [tapCount, setTapCount] = useState(0)
  const [showInput, setShowInput] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [wrongCode, setWrongCode] = useState(false)
  const inputRef = useRef(null)

  const heroRef = useRef(null)
  const faceRef = useRef(null)
  const eyeRefs = useRef([])
  const pupilRefs = useRef([])

  const isRage = tapCount >= 5

  const handleRobotClick = (e) => {
    // If clicking input form or project links, don't trigger tap count
    if (e.target.closest('.secret-input-form') || e.target.closest('.orbit-card')) {
      return
    }
    if (isRage) return
    setTapCount(prev => Math.min(prev + 1, 5))
  }

  useEffect(() => {
    if (isRage) {
      const t = setTimeout(() => setShowInput(true), 3500)
      return () => clearTimeout(t)
    } else {
      setShowInput(false)
      setInputVal('')
      setWrongCode(false)
    }
  }, [isRage])

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus()
  }, [showInput])

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    if (inputVal.trim().toLowerCase() === SECRET_CODE) {
      setTapCount(0)
      setShowInput(false)
      setInputVal('')
      setWrongCode(false)
    } else {
      setWrongCode(true)
      setTimeout(() => setWrongCode(false), 700)
    }
  }

  const handleMouseMove = (e) => {
    if (!heroRef.current || !faceRef.current) return
    const faceRect = faceRef.current.getBoundingClientRect()
    const faceCx = faceRect.left + faceRect.width / 2
    const faceCy = faceRect.top + faceRect.height / 2
    const dx = e.clientX - faceCx
    const dy = e.clientY - faceCy
    const dist = Math.hypot(dx, dy)
    
    // We scale pupil offset based on distance
    const maxDist = 400
    const p = Math.max(0, 1 - dist / maxDist)
    
    const angle = Math.atan2(dy, dx)
    const maxR = 6 + p * 4
    const clamped = Math.min(dist, maxR)
    const px = Math.cos(angle) * clamped
    const py = Math.sin(angle) * clamped

    eyeRefs.current.forEach((eye, i) => {
      const pupil = pupilRefs.current[i]
      if (!eye || !pupil) return
      pupil.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`
    })
  }

  const getSemiStyle = () => {
    if (tapCount <= 1) return {
      background: 'linear-gradient(180deg, #b8c8a0 0%, #8a9a6e 100%)',
      borderColor: '#5a6a48',
      boxShadow: 'inset 0 -8px 16px rgba(0,0,0,.25), 0 0 0 4px #3a4530, 0 0 0 7px #1f2a18',
    }
    if (tapCount === 2) return {
      background: 'linear-gradient(180deg, #c8b870 0%, #9a8848 100%)',
      borderColor: '#7a6828',
      boxShadow: 'inset 0 -8px 16px rgba(0,0,0,.25), 0 0 0 4px #5a4a20, 0 0 0 7px #2a2010',
    }
    if (tapCount === 3) return {
      background: 'linear-gradient(180deg, #c87840 0%, #9a4818 100%)',
      borderColor: '#7a3818',
      boxShadow: 'inset 0 -8px 16px rgba(0,0,0,.3), 0 0 0 4px #4a2010, 0 0 0 7px #2a1008, 0 0 20px rgba(200,100,40,.3)',
    }
    if (tapCount === 4) return {
      background: 'linear-gradient(180deg, #c0392b 0%, #7b241c 100%)',
      borderColor: '#5a1a1a',
      boxShadow: 'inset 0 -8px 16px rgba(0,0,0,.4), 0 0 0 4px #3d1c1c, 0 0 0 7px #1f0f0f, 0 0 40px rgba(255,0,0,.4)',
    }
    return {
      background: 'linear-gradient(180deg, #8b0000 0%, #4a0000 100%)',
      borderColor: '#3a0000',
      boxShadow: 'inset 0 -8px 16px rgba(0,0,0,.5), 0 0 0 4px #2a0000, 0 0 0 7px #0f0000, 0 0 60px rgba(255,0,0,.7)',
    }
  }

  const getPupilStyle = () => {
    if (tapCount <= 1) return {
      width: '36px', height: '36px',
      background: 'radial-gradient(circle, #d7e63b 0%, #8a9a4a 60%, #3a4530 100%)',
      boxShadow: '0 0 8px rgba(215,230,59,.5)',
    }
    if (tapCount === 2) return {
      width: '32px', height: '32px',
      background: 'radial-gradient(circle, #e8cc40 0%, #9a8830 60%, #4a4018 100%)',
      boxShadow: '0 0 8px rgba(220,200,40,.5)',
    }
    if (tapCount === 3) return {
      width: '28px', height: '28px',
      background: 'radial-gradient(circle, #ff8833 0%, #cc5500 60%, #5a2200 100%)',
      boxShadow: '0 0 10px rgba(255,100,30,.6)',
    }
    if (tapCount === 4) return {
      width: '24px', height: '24px',
      background: 'radial-gradient(circle, #ff3333 0%, #c0392b 60%, #5a1a1a 100%)',
      boxShadow: '0 0 14px rgba(255,0,0,.8)',
    }
    return {
      width: '18px', height: '18px',
      background: 'radial-gradient(circle, #ff0000 0%, #800000 60%, #300000 100%)',
      boxShadow: '0 0 22px rgba(255,0,0,1)',
    }
  }

  const getUpperArmStyle = () => {
    if (tapCount <= 1) return {
      background: 'linear-gradient(180deg, #8a9a6e 0%, #5a6a48 100%)',
      borderColor: '#3a4530',
      boxShadow: '0 0 0 3px #1f2a18'
    }
    if (tapCount === 2) return {
      background: 'linear-gradient(180deg, #c8b870 0%, #9a8848 100%)',
      borderColor: '#5a4a20',
      boxShadow: '0 0 0 3px #2a2010'
    }
    if (tapCount === 3) return {
      background: 'linear-gradient(180deg, #c87840 0%, #9a4818 100%)',
      borderColor: '#4a2010',
      boxShadow: '0 0 0 3px #2a1008'
    }
    if (tapCount === 4) return {
      background: 'linear-gradient(180deg, #c0392b 0%, #7b241c 100%)',
      borderColor: '#5a1a1a',
      boxShadow: '0 0 0 3px #1f0f0f'
    }
    return {
      background: 'linear-gradient(180deg, #8b0000 0%, #4a0000 100%)',
      borderColor: '#3a0000',
      boxShadow: '0 0 0 3px #0f0000'
    }
  }

  const getLowerArmStyle = () => {
    if (tapCount <= 1) return {
      background: 'linear-gradient(180deg, #7a8a5e 0%, #4a5a38 100%)',
      borderColor: '#3a4530',
      boxShadow: '0 0 0 3px #1f2a18'
    }
    if (tapCount === 2) return {
      background: 'linear-gradient(180deg, #b8a860 0%, #8a7838 100%)',
      borderColor: '#5a4a20',
      boxShadow: '0 0 0 3px #2a2010'
    }
    if (tapCount === 3) return {
      background: 'linear-gradient(180deg, #b86830 0%, #8a3808 100%)',
      borderColor: '#4a2010',
      boxShadow: '0 0 0 3px #2a1008'
    }
    if (tapCount === 4) return {
      background: 'linear-gradient(180deg, #a93226 0%, #6b2418 100%)',
      borderColor: '#5a1a1a',
      boxShadow: '0 0 0 3px #1f0f0f'
    }
    return {
      background: 'linear-gradient(180deg, #700000 0%, #3d0000 100%)',
      borderColor: '#3a0000',
      boxShadow: '0 0 0 3px #0f0000'
    }
  }

  const getGripBarStyle = () => {
    if (tapCount <= 1) return {}
    if (tapCount === 2) return { background: 'linear-gradient(180deg, #4a3a10 0%, #2a2008 100%)', borderColor: '#1a1008' }
    if (tapCount === 3) return { background: 'linear-gradient(180deg, #5a2a10 0%, #2a1008 100%)', borderColor: '#1a0808' }
    if (tapCount === 4) return { background: 'linear-gradient(180deg, #5a1a1a 0%, #2a0a0a 100%)', borderColor: '#3d0a0a' }
    return { background: 'linear-gradient(180deg, #3a0000 0%, #1a0000 100%)', borderColor: '#200000' }
  }

  const eyebrowAngle = tapCount <= 1 ? 0 : Math.min((tapCount - 1) * 8, 30)
  const eyebrowColors = ['#3a4530','#3a4530','#5a4a20','#6a3010','#5a1a1a','#4a0000']
  const eyebrowColor = eyebrowColors[Math.min(tapCount, 5)]

  const msg = tapCount > 0 && !isRage ? MESSAGES[Math.min(tapCount, 4)] : null
  const tornadoProjects = projects.slice(0, 8)

  return (
    <header className="desktop new-hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <AnimatedBackground />

      {tapCount >= 4 && (
        <div className={`screen-tint ${tapCount === 4 ? 'tint-yellow' : 'tint-red'}`} />
      )}

      <div className="statusbar">
        <span className="brand"><i /> .AH</span>
        <span className="status-center">Web Developer &amp; Creative Designer</span>
        <span className="online"><i /> AVAILABLE FOR WORK</span>
      </div>

      <div className={`hero-center${isRage ? ' suck-in' : ''}`}>
        <div className="hero-badge">HELLO, I'M ALI HASSAN</div>
        <h1 className="hero-title">
          <span>CREATIVE</span>
          <span>DEVELOPER</span>
        </h1>
        <button className="hero-cta" onClick={() => scrollTo('projects')}>
          View Work <ArrowDownRight size={16} />
        </button>
      </div>

      <div
        className="hero-face"
        onClick={handleRobotClick}
        ref={faceRef}
        style={{ cursor: isRage ? 'default' : 'pointer' }}
      >
        {msg && (
          <div className={`speech-bubble tap-${tapCount}`} key={tapCount}>
            {msg}
          </div>
        )}

        <div className="top-row">
          <div className="arm left">
            <div className="upper-arm" style={getUpperArmStyle()} />
            <div className="lower-arm" style={getLowerArmStyle()} />
          </div>

          <div className="semicircle" style={getSemiStyle()}>
            <div className="semicircle-border" />
            <div className="rivet tl" /><div className="rivet tr" />
            <div className="rivet bl" /><div className="rivet br" />

            <div className="eyebrows">
              <div className="eyebrow left"  style={{ transform: `rotate(${eyebrowAngle}deg)`,  background: eyebrowColor }} />
              <div className="eyebrow right" style={{ transform: `rotate(-${eyebrowAngle}deg)`, background: eyebrowColor }} />
            </div>

            <div className="eyes">
              <div className="eye" ref={el => eyeRefs.current[0] = el}>
                <div className="eye-inner">
                  <div className="pupil" ref={el => pupilRefs.current[0] = el} style={getPupilStyle()} />
                </div>
              </div>
              <div className="eye" ref={el => eyeRefs.current[1] = el}>
                <div className="eye-inner">
                  <div className="pupil" ref={el => pupilRefs.current[1] = el} style={getPupilStyle()} />
                </div>
              </div>
            </div>

            <div className={`robot-mouth${isRage ? ' open' : ''}`}>
              <div className="mouth-inner" />
            </div>
          </div>

          <div className="arm right">
            <div className="upper-arm" style={getUpperArmStyle()} />
            <div className="lower-arm" style={getLowerArmStyle()} />
          </div>
        </div>

        <div className="grip-bar" style={getGripBarStyle()} />
      </div>

      {isRage && (
        <div className="tornado-overlay">
          <p className="tornado-label">⚠ SYSTEM OVERLOAD ⚠</p>

          <div className="orbit-container">
            <div className="orbit-ring">
              {tornadoProjects.map((p, i) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="orbit-card"
                  style={{
                    '--i': i,
                    '--color': p.color,
                    '--total': tornadoProjects.length
                  }}
                  title={p.name}
                >
                  <img src={p.image} alt={p.name} />
                  <span>{p.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {isRage && showInput && (
        <form className="secret-input-form" onSubmit={handleCodeSubmit}>
          <div className={`secret-input-wrap${wrongCode ? ' shake' : ''}`}>
            <span className="secret-prompt">›_</span>
            <input
              ref={inputRef}
              className="secret-input"
              type="text"
              placeholder="write the code to stop it"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="secret-submit">ENTER</button>
          </div>
        </form>
      )}
    </header>
  )
}
