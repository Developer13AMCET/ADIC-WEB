import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormModal from "../components/FormModal";
import "./ProjectsPage.css";

const projects = [
  { number:"01", title:"BIOMETRICS", image:"/Biometrics.webp", demo:"", slug:"biometrics", description:"A technology project focused on practical biometric workflows and identity-driven solutions." },
  { number:"02", title:"ROADGUARD AI", image:"/RoadGuardAI.jpeg", demo:"", slug:"roadguard-ai", description:"An intelligent mobility concept focused on safer roads and smarter transportation." },
  { number:"03", title:"ALUMNILINK", image:"/AluminiLink.avif", demo:"", slug:"alumnilink", description:"A platform concept designed to connect students and alumni through meaningful interaction." },
  { number:"04", title:"FOUNDERFORGE", image:"/FounderForge.png", demo:"", slug:"founderforge", description:"A platform concept that helps ideas move from concept towards execution." },
  { number:"05", title:"ZIPPY RIDE", image:"/ZippyRide.jpg", demo:"", slug:"zippy-ride", description:"A smart mobility concept designed to improve everyday transportation." },
];

function ProjectCard({ project }) {
  const [loaded, setLoaded] = useState(false);
  return <article className="project-card"><div className={`project-image-wrap ${loaded ? "is-loaded" : ""}`}><img src={project.image} alt={project.title} onLoad={() => setLoaded(true)} /><div className="project-image-overlay"><span>ADIC / PROJECTS</span><span>{project.number}</span></div></div><div className="project-card-footer"><span className="project-number">{project.number}</span><h2>{project.title}</h2><div className="project-actions">{project.demo ? <a href={project.demo} target="_blank" rel="noreferrer" className="live-button">LIVE</a> : <span className="live-button disabled">LIVE</span>}<a href={`/projects/${project.slug}`} className="project-detail-icon" aria-label={`View ${project.title} details`}>↗</a></div></div></article>;
}

export default function Projects() {
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#build-with-adic") {
      const timer = setTimeout(() => document.getElementById("build-with-adic")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    setTimeout(() => document.getElementById("build-with-adic")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  return <div className="projects-page"><Header />
    {success && <div className="success-toast" role="status"><span>✓</span>Thank you, your form has been submitted successfully.</div>}
    <main>
      <section className="projects-hero"><div className="projects-hero-grid" /><div className="projects-hero-content"><p className="section-label">ADIC PROJECTS</p><h1>WHAT WE BUILD.</h1><p>Ideas, experiments and products built by the ADIC community.</p></div></section>
      <section className="projects-list"><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div></section>
      <section className="build-with-adic section" id="build-with-adic"><div className="build-heading"><p className="section-label">BUILD WITH ADIC</p><h2>Have an idea?<br /><span>Let's build it.</span></h2><p>Tell us what you want to solve, what you want to build and where you need support. Your idea can be at any stage.</p></div><button type="button" className="idea-open-button" onClick={() => setShowIdeaForm(true)}>Submit Your Idea <span>↗</span></button></section>
    </main>
    <Footer />
    {showIdeaForm && <FormModal type="idea" onClose={() => setShowIdeaForm(false)} onSuccess={handleSuccess} />}
  </div>;
}

export { projects };
