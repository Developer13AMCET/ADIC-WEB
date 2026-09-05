import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./App.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import ExploreADIC from "./pages/ExploreADIC.jsx";

const path = window.location.pathname.replace(/\/$/, "") || "/";
let Page = Home;
let props = {};

if (path === "/projects") Page = Projects;
else if (path === "/explore-adic") Page = ExploreADIC;
else if (path.startsWith("/projects/")) { Page = ProjectDetails; props.slug = path.split("/")[2]; }

createRoot(document.getElementById("root")).render(<StrictMode><Page {...props} /></StrictMode>);
