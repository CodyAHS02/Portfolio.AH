import Window from './Window'

export default function AboutWindow() {
  return (
    <Window id="about" title="C:\Users\developer\about" eyebrow="01 / PROFILE">
      <div className="section-heading">
        <h2>Human behind<br />the <em>keyboard.</em></h2>
        <p>I care about the invisible details—the rhythm of a layout, the feel of an interaction, and code the next person can actually enjoy reading.</p>
      </div>
      <div className="about-layout">
        <div className="avatar">
          <img src="/Me.png" alt="My Image" />
        </div>
        <div>
          <h3>Hi, I'm <span>Ali Hassan</span> 👋</h3>
          <p className="lead">Web Developer &amp; Creative Designer</p>
          <p>I build clean, responsive, high-performing websites and web apps with a focus on thoughtful UI, smooth user experience, and maintainable code.</p>
          <div className="facts">
            <span><small>BASED IN</small>Karachi, Pakistan</span>
            <span><small>AVAILABLE</small>Freelance / Full-time</span>
            <span><small>FOCUS</small>Web Apps · Sites · UI/UX</span>
            <span><small>Focused Skill</small>Wordpress, React</span>
          </div>
        </div>
      </div>
    </Window>
  )
}
