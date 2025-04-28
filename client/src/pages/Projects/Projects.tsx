import { useEffect } from "react";
import ProjectCard from "../../components/ProjectCard";
import "../../App.css";

// This is a placeholder for the fetched projects. In an ideal world, I would fetch this data from an API hosted on a server; however, I'm trying to minimalise complexity to ensure I can host this at the smallest possible cost.
const fetchedProjects = [
  {
    id: 1,
    name: "Casse Croute",
    url: "https://github.com/WildCodeSchool-2024-09/JS-Nantes-CSS117-P3_Casse-Croute",
    image: "https://picsum.photos/id/237/200/300 ",
    tech: "React, TypeSrcipt, CSS, Express, MySQL",
    context:
      "This project incorporates a MySQL database, and the creation of secured accounts, with hashed passwords to a single page application where logged-in users can contribute recipes to a community based website.\n\nCasse-croûters can create and edit recipes which can also be governed by an administrator. Each recipe also includes the possibility to create and submit ingredients that are incorporated into the database for use by the community. This project incorporates a full CRUD/BREAD-style set of actions, and could be adapted to a wide range of community based websites, or for commercial purposes.\n\nThis project was realised in a group setting with 3 other budding developers, in an agile work environment. Our workflow consisted of both peer-reviewed and overseeing developer-reviewed pull requests, and daily and weekly reviews and check-ins.",
    video: "Cassecrouteedit(1).mp4",
  },
  {
    id: 2,
    name: "WeaRther Forecast",
    url: "https://github.com/WildCodeSchool-2024-09/JS-Nantes-P2-WeartherForcast",
    image:
      "https://fastly.picsum.photos/id/297/200/200.jpg?hmac=elahxndleNOPlIfCfcZuJFmS-MkvvkXnQozwsyqF-FU",
    tech: "React, CSS, TypeScript",
    context:
      "Another project realised in a group of four, with developers learning the caveats of fetching from an established API (in this case, OpenWeatherMap). This application incorporates fetched data with user preferences to display personalised clothing recommendations that account for both the temperature, humidity and activities envisioned for the day.",
    video: "WearTheRForecastCompressed.mp4",
  },
  {
    id: 3,
    name: "NeoDev",
    url: "https://github.com/naiiipan44/Neo-Dev-Projet-1",
    image: "https://pics",
    tech: "HTML, JavaScript, CSS",
    context:
      "The first project of what would be many - this is a simple, showcase site. A pseudo-prototype-proof-of-concept developed within a group of four beginning developers. This project served as an opportunity to begin familiarizing ourselves with Git and employing our newly acquired JavaScript DOM manipulation.",
    video: "Neodevcompressed (2).mp4",
  },
];

function Projects() {
  useEffect(() => {
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
          <div key={el.id}>
            <div className="project-card project-card-hidden video-parent">
              <video src={el.video} autoPlay loop muted />
              <div className="video-overlay" />
            </div>
            <a href={el.url}>
              <div className="project-card project-card-hidden">
                <ProjectCard project={el} />
              </div>
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}
export default Projects;
