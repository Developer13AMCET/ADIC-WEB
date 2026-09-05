import { useEffect, useState } from "react";
import "./App.css";
import LogoIntro from "./components/LogoIntro";
import Header from "./components/Header";
import StudentJourney from "./components/StudentJourney";
import Footer from "./components/Footer";
import FormModal from "./components/FormModal";

const domains = [
  { number: "01", title: "Web Development", description: "Modern websites and digital experiences.", type: "web" },
  { number: "02", title: "Artificial Intelligence", description: "Intelligent systems and machine learning.", type: "ai" },
  { number: "03", title: "App Development", description: "Mobile experiences built for real users.", type: "app" },
  { number: "04", title: "Data & Analytics", description: "Turning information into useful insights.", type: "data" },
  { number: "05", title: "Cloud & DevOps", description: "Scalable systems and reliable infrastructure.", type: "cloud" },
  { number: "06", title: "Cyber Security", description: "Building safer and more secure technology.", type: "security" },
];

const featuredProjects = [
  { number: "01", title: "ZippyRide", image: "/ZippyRide.jpg", slug: "zippy-ride", demo: "" },
  { number: "02", title: "RoadGuard AI", image: "/RoadGuardAI.jpeg", slug: "roadguard-ai", demo: "" },
  { number: "03", title: "FounderForge", image: "/FounderForge.png", slug: "founderforge", demo: "" },
];

function ProjectPreview({ project }) {
  return <article className="home-project-card">
    <div className="home-project-image"><img src={project.image} alt={project.title} /><span>ADIC / PROJECT {project.number}</span></div>
    <div className="home-project-footer"><h3>{project.title}</h3><div className="project-actions">
      {project.demo ? <a className="live-button" href={project.demo} target="_blank" rel="noreferrer">LIVE</a> : <span className="live-button disabled">LIVE</span>}
      <a className="project-detail-icon" href={`/projects/${project.slug}`} aria-label={`View ${project.title} details`}>↗</a>
    </div></div>
  </article>;
}

function DomainVisual({ type }) {
  const labels = { web: "Web Development", ai: "Artificial Intelligence", app: "App Development", data: "Data & Analytics", cloud: "Cloud & DevOps", security: "Cyber Security" };
  return <div className={`domain-art domain-art-${type}`} aria-hidden="true">
    <img src={`/domain-art/${type}.svg`} alt="" />
    <span>{labels[type]}</span>
  </div>;
}

function Home() {
  const [showIntro, setShowIntro] = useState(() => !window.location.hash);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showIntro) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    return () => window.clearTimeout(timer);
  }, [showIntro]);

  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showForm]);

  const handleApplicationSuccess = () => {
    setShowSuccess(true);
    window.setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    window.setTimeout(() => setShowSuccess(false), 5000);
  };

  return <>
    {showIntro && <LogoIntro onComplete={() => setShowIntro(false)} />}
    {!showIntro && <>
      <Header />
      {showSuccess && <div className="success-toast" role="status"><span>✓</span>Thank you, your form has been submitted successfully.</div>}
      <main>
        <section className="hero" id="home"><div className="hero-container">
          <div className="hero-left"><p className="eyebrow">AMCET DIGITAL INNOVATION CELL</p><h1>Turning ideas into<br /><span>innovation.</span></h1><p className="hero-description">A student-driven space where technology, creativity and collaboration come together to build meaningful solutions.</p>
            <div className="hero-actions"><a href="/explore-adic" className="hero-btn primary">Explore ADIC <span>↗</span></a><button type="button" className="hero-btn secondary" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" })}>Join ADIC <span>↗</span></button></div>
          </div><div className="hero-right"><StudentJourney /></div>
        </div></section>

        <section className="foundation section" id="foundation"><div className="section-heading"><p className="section-label">OUR FOUNDATION</p><h2>Think. Build. Innovate.</h2></div>
          <div className="foundation-grid">
            {[['01','Think','Question problems, explore possibilities and turn ideas into meaningful concepts.','01 — THINK','/adic-join.jpg'],['02','Build','Transform concepts into practical products through technology and teamwork.','02 — BUILD','/ZippyRide.jpg'],['03','Innovate','Create solutions that make an impact beyond the classroom.','03 — INNOVATE','/Biometrics.webp']].map(([number,title,text,label,image]) => <article className="foundation-card" key={number}>
              <div className="foundation-image"><img src={image} alt="" /><span>{label}</span><strong>{number}</strong></div><div className="foundation-card-body"><span className="card-number">{number}</span><h3>{title}</h3><p>{text}</p></div>
            </article>)}
          </div>
        </section>

        <section className="domains section" id="domains"><div className="section-heading"><p className="section-label">TECHNOLOGY DOMAINS</p><h2>Explore where technology takes you.</h2></div>
          <div className="domains-grid">{domains.map((domain) => <article className="domain-card" key={domain.number}><DomainVisual type={domain.type} /><div className="domain-content"><span className="domain-index">{domain.number}</span><h3>{domain.title}</h3><p>{domain.description}</p></div></article>)}</div>
        </section>

        <section className="about section" id="about"><div className="about-container"><div className="about-image-area"><div className="about-frame-outer"><span className="frame-corner corner-tl" /><span className="frame-corner corner-br" /><span className="frame-label">ADIC / 2026</span><div className="about-frame"><img src="/adic-join.jpg" alt="ADIC students" /></div><span className="frame-note">THINK · BUILD · INNOVATE</span></div></div>
          <div className="about-content"><p className="section-label">ABOUT ADIC</p><h2>A place to learn,<br />experiment and create.</h2><p>ADIC brings students together to explore technology, work on real-world ideas and build solutions that matter.</p><p>It is a space where curiosity becomes collaboration and learning becomes action.</p><button className="apply-btn" type="button" onClick={() => setShowForm(true)}>Apply Now <span>↗</span></button></div>
        </div></section>

        <section className="projects section" id="projects"><div className="section-heading projects-heading-row"><div><p className="section-label">PROJECTS</p><h2>Ideas that became real.</h2></div><a href="/projects" className="view-projects-btn">View All Projects <span>↗</span></a></div><div className="home-projects-grid">{featuredProjects.map((project) => <ProjectPreview key={project.number} project={project} />)}</div></section>
      </main>
      <Footer />
      {showForm && <FormModal type="application" onClose={() => setShowForm(false)} onSuccess={handleApplicationSuccess} />}
    </>}
  </>;
}

export default Home;
