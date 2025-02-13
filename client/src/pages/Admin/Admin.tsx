import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectCreateForm from "../../components/ProjectCreateForm";
import type { message, projectTypes } from "../../types/portfolioTypes";

function Admin() {
  //Fetch the projects
  const [fetchedProjects, setFetchedProjects] = useState<projectTypes[]>([]);
  const [fetchedMessages, setFetchedMessages] = useState<message[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/project`)
      .then((response) => response.json())
      .then((data) => setFetchedProjects(data));

    fetch(`${import.meta.env.VITE_API_URL}/api/message`)
      .then((response) => response.json())
      .then((data) => setFetchedMessages(data));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              //requestAnimationFrame helps react indicate that the setActiveSection even should happen after the re-render - thus allowing the CSS timing to effectively take place rather than having the class attributed before the render, and thus producing no animation.
              setActiveSection(entry.target.id);
            });
          }
        }
      },
      {
        threshold: 0.5,
      },
    );

    const elementsToObserve = document.querySelectorAll(
      "#title, #create-project-form, #projects-to-modify, #message-display",
    ); // Or any other selector

    for (const element of elementsToObserve) {
      observer.observe(element);
    }

    return () => {
      for (const el of elementsToObserve) {
        observer.unobserve(el);
      }
    };
  }, []);

  console.warn("fetched Projects:", fetchedProjects);

  return (
    <main>
      <h1 className="persistent-heading">Admin</h1>
      <section
        id="create-project-form"
        className={activeSection === "create-project-form" ? "show" : "hidden"}
      >
        <h2>Create Projects</h2>
        <ProjectCreateForm />
      </section>
      <section
        id="projects-to-modify"
        className={activeSection === "projects-to-modify" ? "show" : "hidden"}
      >
        <h2>Modify Projects</h2>
        {fetchedProjects.map((el) => (
          <div key={el.id}>
            <h3>Name: {el.name}</h3>{" "}
            <button
              type="button"
              onClick={() =>
                el.id
                  ? navigate(`/modify-project/${el.id}`)
                  : toast.error(
                      "There has been a problem identifying the ID of this project",
                    )
              }
            >
              Modify
            </button>
            <button
              type="button"
              onClick={() =>
                el.id
                  ? fetch(
                      `${import.meta.env.VITE_API_URL}/api/project/delete/${el.id}`,
                      {
                        method: "delete",
                      },
                    ).then((response) => {
                      if (response.status === 204) {
                        toast.success("Project successfully deleted");
                      }
                    })
                  : toast.error(
                      "There has been a problem identifying the ID of this project",
                    )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </section>
      <section
        id="message-display"
        className={activeSection === "message-display" ? "show" : "hidden"}
      >
        <h2>Messages</h2>
        {fetchedMessages.map((el) => (
          <div key={el.id}>
            <h3>{el.id}</h3>
            <h3>Name: </h3> <p>{el.user_name}</p>
            <h2>Email: </h2> <p>{el.email}</p>
            <h2>Messsage: </h2> <p>{el.message}</p>
            <button
              type="button"
              onClick={() =>
                el.id
                  ? fetch(
                      `${import.meta.env.VITE_API_URL}/api/message/delete/${el.id}`,
                      {
                        method: "delete",
                      },
                    ).then((response) => {
                      if (response.status === 204) {
                        toast.success("message successfully deleted");
                      }
                    })
                  : toast.error(
                      "There has been a problem identifying the ID of this message",
                    )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
export default Admin;
