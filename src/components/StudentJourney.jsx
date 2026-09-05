import { useState } from "react";
import "./StudentJourney.css";

function StudentJourney() {
  const [active, setActive] = useState("IDEA");

  const stages = [
    { name: "IDEA", text: "Explore problems and opportunities" },
    { name: "DESIGN", text: "Shape ideas into possibilities" },
    { name: "BUILD", text: "Build and bring ideas to life" },
  ];

  const currentStage = stages.find((stage) => stage.name === active) || stages[0];

  return (
    <div className="innovation-visual" aria-label="ADIC innovation journey">
      <div className="visual-grid" />
      <div className="visual-glow glow-one" />
      <div className="visual-glow glow-two" />

      <div className="visual-topline">
        <span className="status-dot" />
        <span>ADIC INNOVATION SPACE</span>
        <span className="visual-code">01 — 03</span>
      </div>

      <div className="logo-stage">
        <div className="logo-ring ring-one" />
        <div className="logo-ring ring-two" />
        <div className="logo-ring ring-three" />

        <div className="logo-aura" />

        <button
          className="hero-logo-button"
          onClick={() => setActive(active === "BUILD" ? "IDEA" : "BUILD")}
          aria-label="Change ADIC innovation stage"
        >
          <img src="/adic-logo.jpeg" alt="ADIC logo" />
        </button>

        <span className="visual-orbit-label label-top">THINK</span>
        <span className="visual-orbit-label label-right">BUILD</span>
        <span className="visual-orbit-label label-bottom">IMPACT</span>
        <span className="visual-orbit-label label-left">CREATE</span>
      </div>

      <div className="journey-status">
        <div>
          <span className="journey-kicker">CURRENT STAGE</span>
          <strong>{currentStage.name}</strong>
          <p>{currentStage.text}</p>
        </div>
        <div className="journey-line" aria-hidden="true">
          <span className="journey-progress" />
        </div>
      </div>

      <div className="journey-stages">
        {stages.map((stage, index) => (
          <button
            key={stage.name}
            className={active === stage.name ? "active" : ""}
            onClick={() => setActive(stage.name)}
          >
            <span>0{index + 1}</span>
            <strong>{stage.name}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StudentJourney;
