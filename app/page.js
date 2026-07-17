'use client'

import { useCallback, useState } from 'react'
import BootLoader from '@/components/BootLoader'
import AboutWindow from '@/components/AboutWindow'
import ProjectsWindow from '@/components/ProjectsWindow'
import StackWindow from '@/components/StackWindow'
import ExperienceWindow from '@/components/ExperienceWindow'
import ServicesWindow from '@/components/ServicesWindow'
import TerminalWindow from '@/components/TerminalWindow'
import ContactWindow from '@/components/ContactWindow'
import Footer from '@/components/Dock'
import DesktopMain from '@/components/DesktopMain'

export default function Home() {
  const [booting, setBooting] = useState(true)
  const done = useCallback(() => setBooting(false), [])

  return (
    <>
      {booting && <BootLoader onDone={done} />}
      {!booting && (
        <main className="main-ready">
          <DesktopMain />
          <div className="workspace">
            <AboutWindow />
            <ProjectsWindow />
            <StackWindow />
            <ExperienceWindow />
            <ServicesWindow />
            <ContactWindow />
            <TerminalWindow />
          </div>
          <Footer />
        </main>
      )}
    </>
  )
}
