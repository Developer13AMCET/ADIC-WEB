import "./Footer.css";

function SocialIcon({ type }) {
  if (type === "instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>;
  if (type === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8.5V18M6 6.1v.1M10 18v-5.3a3.2 3.2 0 0 1 6.4 0V18M10 10.5V18"/><circle cx="6" cy="6" r="1.4" fill="currentColor" stroke="none"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17z"/><path d="m4 7 8 6 8-6"/></svg>;
}

function Footer() {
  const homeSection = (id) => `/#${id}`;

  return <footer className="footer" id="contact">
    <div className="footer-contact-strip">
      <div><span className="footer-kicker">LET'S CONNECT</span><h2>Have an idea? <span>Let’s build it.</span></h2><p>Have an idea, proposal or just want to say hello? We’d love to hear from you.</p></div>
    </div>

    <div className="footer-main">
      <div className="footer-brand-block">
        <div className="footer-brand-line">
          <div className="footer-logo-box"><img src="/adic-logo.jpeg" alt="ADIC logo" /></div>
          <p>AMCET Digital Innovation Cell — a space to think, build and innovate.</p>
        </div>
        <div className="footer-socials">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon type="instagram" /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><SocialIcon type="linkedin" /></a>
          <a href="mailto:monikagopi3@gmail.com" aria-label="Email"><SocialIcon type="mail" /></a>
        </div>
      </div>

      <div className="footer-column"><span>EXPLORE</span><a href={homeSection("home")}>Home</a><a href={homeSection("foundation")}>Foundation</a><a href={homeSection("domains")}>Domains</a><a href={homeSection("about")}>About</a><a href="/projects">Projects</a><a href="/explore-adic">Explore ADIC</a></div>
      <div className="footer-column"><span>GET INVOLVED</span><a href={homeSection("about")}>Join ADIC</a><a href="/projects#build-with-adic">Start a Project</a><a href="/explore-adic">Meet the Team</a><a href="mailto:adic@amcet.ac.in">Contact Us</a></div>
      <div className="footer-column footer-details"><span>CONNECT</span><a href="mailto:adic@amcet.ac.in">adic@amcet.ac.in</a><p>Ranipet, Tamil Nadu</p></div>
    </div>

    <div className="footer-bottom"><span>© {new Date().getFullYear()} ADIC — AMCET Digital Innovation Cell. All rights reserved.</span><span>Think · Build · Innovate</span></div>
  </footer>;
}
export default Footer;
