import { useEffect, useState } from "react";
import "../../App.css";

function Home() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
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
        threshold: 0.6,
      },
    );

    const elementsToObserve = document.querySelectorAll("#title, #about, #CV"); // Or any other selector

    for (const element of elementsToObserve) {
      observer.observe(element);
    }

    return () => {
      for (const el of elementsToObserve) {
        observer.unobserve(el);
      }
    };
  }, []);

  return (
    <main>
      <header
        id="title"
        className={activeSection === "title" ? "show" : "hidden"}
      >
        <h1>Cyrus Weir</h1>
      </header>
      <article
        id="about"
        className={activeSection === "about" ? "show" : "hidden"}
      >
        <h2>About</h2>
        <p>
          Australian produce, born in Barmera, educated in Glossop, bachelorised
          in Adelaide, taught in Roxby Downs, settled in Nantes and ready to
          join your team.
        </p>
      </article>
      <section id="CV" className={activeSection === "CV" ? "show" : "hidden"}>
        <h2>The CV</h2>
        <a href="/CyrusWEIRCVFR.pdf">EN</a>
        <a href="/CyrusWEIRCVFR.pdf">FR</a>
      </section>
    </main>
  );
}

export default Home;
