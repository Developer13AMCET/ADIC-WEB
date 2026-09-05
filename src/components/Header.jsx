import { useState } from "react";
import "./Header.css";

const homeLinks = [
  ["Home", "home"],
  ["Foundation", "foundation"],
  ["Domains", "domains"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

function goHomeSection(id) {
  if (window.location.pathname === "/" || window.location.pathname === "") {
    window.history.replaceState(null, "", `/#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.assign(`/#${id}`);
  }
}

function Header() {
  const [open, setOpen] = useState(false);

  const navigate = (id) => {
    setOpen(false);
    goHomeSection(id);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="header-brand" type="button" onClick={() => navigate("home")} aria-label="ADIC Home">
          <img src="/adic-logo.jpeg" alt="ADIC Logo" />
          <div className="header-brand-text"><span>ADIC</span><small>AMCET DIGITAL INNOVATION CELL</small></div>
        </button>

        <nav className="header-links" aria-label="Main navigation">
          {homeLinks.map(([label, id]) => id === "projects" ? <a key={id} href="/projects">{label}</a> : <button key={id} type="button" onClick={() => navigate(id)}>{label}</button>)}
        </nav>

        <button className="header-contact" type="button" onClick={() => navigate("about")}>Join ADIC <span>→</span></button>
        <button className={`menu-toggle ${open ? "open" : ""}`} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {homeLinks.map(([label, id]) => id === "projects" ? <a key={id} href="/projects" onClick={() => setOpen(false)}>{label}</a> : <button key={id} type="button" onClick={() => navigate(id)}>{label}</button>)}
          <button type="button" className="mobile-join" onClick={() => navigate("about")}>Join ADIC <span>→</span></button>
        </nav>
      )}
    </header>
  );
}

export default Header;
