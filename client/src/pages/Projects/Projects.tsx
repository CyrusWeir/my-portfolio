import { useEffect, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import type { projectTypes } from "../../types/portfolioTypes";
import "../../App.css";

function Projects() {
  const [fetchedProjects, setFetchedProjects] = useState<projectTypes[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/project`)
      .then((response) => response.json())
      .then((data) => setFetchedProjects(data));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("project-card-show");
            observer.unobserve(entry.target); // Stop observing once it's shown
          }
        }
      },
      { threshold: 0.75 },
    );

    setTimeout(() => {
      for (const card of document.querySelectorAll(".project-card")) {
        observer.observe(card);
      }
    }, 500); // Ensure elements exist before observing

    return () => observer.disconnect();
  }, []);

  return (
    <div className="projects">
      <h1 id="title">Projects</h1>
      <section id="project-section">
        {fetchedProjects.map((el) => (
          <a href={el.url} key={el.id}>
            <div className="project-card project-card-hidden video-parent">
              <video src={el.video} autoPlay loop muted />
              <div className="video-overlay" />
            </div>
            <div className="project-card project-card-hidden">
              <ProjectCard project={el} />
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
export default Projects;
