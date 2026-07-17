import Window from './Window'
import { services } from '@/lib/services'

export default function ServicesWindow() {
  return (
    <Window id="services" title="C:\Services\menu" eyebrow="05 / WHAT I DO">
      <div className="section-heading">
        <h2>Ways I can<br /><em>help you.</em></h2>
        <p>Bring the idea, the messy prototype, or the almost-there product. We'll make it excellent.</p>
      </div>
      <div className="services-grid">
        {services.map(([icon, title, desc], i) => (
          <article key={title}>
            <span className="service-icon">{icon}</span>
            <small>0{i + 1}</small>
            <h3>{title}</h3>
            <p>{desc}</p>
            <b>EXPLORE SERVICE →</b>
          </article>
        ))}
      </div>
    </Window>
  )
}
