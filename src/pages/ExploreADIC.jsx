import Header from "../components/Header";
import Footer from "../components/Footer";
import "./ExploreADIC.css";

const members = ["Elavalagan", "Joel Kumar", "Kamalesh", "Logith Kannan", "Lokeshwwaran", "Madhumitha.T", "Monika.G", "Moshina Tabasum", "Prajan", "Sai Niklesh", "Sanjay", "Santha Kumar", "Vasanth Raj"];
const portfolios = {};
const memberImages = {}; // Add image paths later, e.g. { "Elavalagan": "/members/elavalagan.jpg" }

export default function ExploreADIC() {
  return <div className="explore-page"><Header />
    <main>
      <section className="explore-hero"><div><p className="section-label">EXPLORE ADIC</p><h1>Meet the people<br /><span>behind the ideas.</span></h1><p>ADIC is powered by students who learn, experiment, collaborate and turn curiosity into things worth building.</p></div></section>

      <section className="explore-stats"><div><strong>13</strong><span>STUDENT DEVELOPERS</span></div><div><strong>6+</strong><span>TECHNOLOGY DOMAINS</span></div><div><strong>01</strong><span>INNOVATION CELL</span></div></section>

      <section className="team-section section"><div className="section-heading"><p className="section-label">THE PEOPLE BEHIND ADIC</p><h2>Students who build together.</h2></div>
        <div className="member-grid">{members.map((name, index) => <article className="member-card" key={name}>
          <div className="member-top"><span>{String(index + 1).padStart(2, "0")}</span><span>ADIC</span></div>
          <div className="member-avatar" aria-label={`${name} photo`}>
            {memberImages[name] ? <img src={memberImages[name]} alt={`${name}`} /> : name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <h3>{name}</h3><p>Student Developer</p>
          {portfolios[name] ? <a href={portfolios[name]} target="_blank" rel="noreferrer">View Portfolio <span>↗</span></a> : <span className="portfolio-pending">Portfolio</span>}
        </article>)}</div>
      </section>

      <section className="explore-values section"><div className="section-heading"><p className="section-label">HOW WE WORK</p><h2>More than individual skills.</h2></div><div className="values-grid">
        <div className="value-card"><span>01</span><h3>Learn</h3><p>Explore technologies through hands-on work, experimentation and shared knowledge.</p></div>
        <div className="value-card"><span>02</span><h3>Build</h3><p>Work together on practical ideas and turn concepts into useful products.</p></div>
        <div className="value-card"><span>03</span><h3>Collaborate</h3><p>Bring different strengths together and learn from the people around you.</p></div>
        <div className="value-card"><span>04</span><h3>Impact</h3><p>Create solutions that move beyond the classroom and solve real problems.</p></div>
      </div></section>

      <section className="explore-cta"><p className="section-label">BUILD WITH US</p><h2>Want to build<br /><span>with ADIC?</span></h2><a href="/#about">Join ADIC <span>↗</span></a></section>
    </main>
    <Footer />
  </div>;
}
