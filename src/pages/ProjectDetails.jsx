import Header from "../components/Header";
import Footer from "../components/Footer";
import { projects } from "./Projects";
import "./ProjectDetails.css";

export default function ProjectDetails({ slug }) {
  const project = projects.find(p => p.slug === slug);
  if (!project) return <><Header /><main className="not-found"><p className="section-label">PROJECT</p><h1>Project not found.</h1><a href="/projects">Back to Projects ↗</a></main><Footer /></>;
  return <div className="details-page"><Header /><main><section className="details-hero"><div><p className="section-label">ADIC / PROJECT {project.number}</p><h1>{project.title}</h1><p>{project.description}</p><div className="details-actions">{project.demo ? <a className="live-button" href={project.demo} target="_blank" rel="noreferrer">LIVE PROJECT ↗</a> : <span className="live-button disabled">LIVE PROJECT</span>}<a href="/projects">← All Projects</a></div></div><div className="details-image"><img src={project.image} alt={project.title} /></div></section><section className="details-copy section"><div><p className="section-label">ABOUT THE PROJECT</p><h2>A project built through ideas, experimentation and collaboration.</h2></div><p>{project.description} More project information, contributors and live links can be added here as the project details are finalized.</p></section></main><Footer /></div>;
}
