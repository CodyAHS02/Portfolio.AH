import Window from './Window'
import { stack } from '@/lib/stack'

export default function StackWindow() {
  return (
    <Window id="stack" title="C:\Workspace\stack" eyebrow="02 / TOOLBOX">
      <div className="section-heading">
        <h2>Tools of<br /><em>the trade.</em></h2>
        <p>A practical toolkit chosen for speed, clarity, and shipping work that holds up.</p>
      </div>
      <div className="stack-grid">
        {Object.entries(stack).map(([group, items], idx) => (
          <article className="stack-group" key={group}>
            <span className="index">0{idx + 1}</span>
            <h3>{group}</h3>
            <div>
              {items.map(item => (
                <span className="chip" key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Window>
  )
}
