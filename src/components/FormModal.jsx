import { useEffect, useState } from "react";
import "./FormModal.css";

const FORM_SUBMIT_URL = "https://formsubmit.co/ajax/monikagopi3@gmail.com";

export default function FormModal({ type = "application", onClose, onSuccess }) {
  const isApplication = type === "application";
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.Email.value.trim();
    const contact = isApplication ? form.elements["Contact No"].value.trim() : "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (isApplication && !/^\d{10}$/.test(contact)) {
      setError("Contact No must contain exactly 10 digits.");
      return;
    }

    setError("");
    setSending(true);

    try {
      const response = await fetch(FORM_SUBMIT_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error("Submission failed");
      onSuccess?.();
      onClose();
    } catch {
      setError("We couldn't submit the form right now. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="adic-modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="adic-modal" role="dialog" aria-modal="true" aria-labelledby="adic-modal-title">
        <button className="adic-modal-close" type="button" onClick={onClose} aria-label="Close form">×</button>

        <div className="adic-modal-visual">
          <span>ADIC / {isApplication ? "APPLICATION" : "IDEA"}</span>
          <div>
            <p>{isApplication ? "JOIN ADIC" : "BUILD WITH ADIC"}</p>
            <h2>{isApplication ? <>Build something<br />worth building.</> : <>Have an idea?<br /><strong>Let's build it.</strong></>}</h2>
            <small>{isApplication ? "Join the student innovation community." : "Tell us what you want to solve and build."}</small>
          </div>
        </div>

        <form className="adic-form" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value={isApplication ? "New ADIC Application" : "New ADIC Project Idea"} />
          <input type="hidden" name="_captcha" value="false" />
          <div className="adic-form-heading">
            <span>{isApplication ? "APPLICATION" : "PROJECT IDEA"}</span>
            <h3>{isApplication ? "Join ADIC" : "Submit your idea"}</h3>
          </div>

          {isApplication ? (
            <div className="adic-form-grid">
              <Field label="Name" name="Name" required />
              <Field label="Email" name="Email" type="email" required />
              <Field label="Department" name="Department" required />
              <Field label="Domain" name="Domain" />
              <Field label="Projects" name="Projects" />
              <Field label="Contact No" name="Contact No" type="tel" required inputMode="numeric" maxLength="10" onInput={(event) => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 10); }} />
              <Field label="Why ADIC?" name="Why ADIC" textarea required full rows="4" />
            </div>
          ) : (
            <div className="adic-form-grid">
              <Field label="Name" name="Name" required />
              <Field label="Email" name="Email" type="email" required />
              <Field label="Department" name="Department" required />
              <Field label="Project / Idea Name" name="Project / Idea Name" required />
              <Field label="Technology Domain" name="Technology Domain" placeholder="e.g. AI, Web, App Development" required />
              <Field label="Team Status" name="Team Status" select options={["Solo", "Already have a team", "Looking for a team"]} />
              <Field label="Project Stage" name="Project Stage" select options={["Idea", "Designing", "Prototype", "Working Project"]} />
              <Field label="What support do you need?" name="Support Needed" placeholder="Mentoring, team, technical guidance..." />
              <Field label="What problem does your idea solve?" name="Problem" textarea required full rows="3" />
              <Field label="Describe your idea" name="Idea Description" textarea required full rows="5" />
              <Field label="Why do you want to build it with ADIC?" name="Why ADIC" textarea required full rows="3" />
            </div>
          )}

          {error && <p className="adic-form-error" role="alert">{error}</p>}
          <button className="adic-form-submit" type="submit" disabled={sending}>
            {sending ? "Submitting..." : isApplication ? "Submit Application" : "Submit Idea"} <span>↗</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", textarea = false, select = false, options = [], full = false, ...props }) {
  return (
    <div className={`adic-field ${full ? "full" : ""}`}>
      <label htmlFor={`field-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>{label}</label>
      {textarea ? <textarea id={`field-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`} name={name} {...props} /> : select ? <select id={`field-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`} name={name} defaultValue={options[0]}>{options.map((option) => <option key={option}>{option}</option>)}</select> : <input id={`field-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`} type={type} name={name} {...props} />}
    </div>
  );
}
