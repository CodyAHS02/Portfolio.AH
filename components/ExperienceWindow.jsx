import Window from './Window'
import { experience } from '@/lib/experience'

export default function ExperienceWindow() {
  return (
    <Window id="experience" title="C:\Career\experience" eyebrow="04 / LOGBOOK">
      <div className="section-heading">
        <h2>Work, growth<br />&amp; <em>good people.</em></h2>
        <p>A short log of teams I've helped and problems I've had the pleasure to untangle.</p>
      </div>
      <div className="timeline">
        {experience.map((job, i) => (
          <article key={job.role} style={{ '--i': i }}>
            <div className="timeline-marker">{String(i + 1).padStart(2, '0')}</div>
            <div className="job-head">
              <div>
                <h3>{job.role}</h3>
                <p>{job.company}</p>
              </div>
              <time>{job.date}</time>
            </div>
            <ul>
              {job.points.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="tech">
              {job.tech.map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Window>
  )
}
