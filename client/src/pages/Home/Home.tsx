import { useEffect, useState } from "react";
import "../../App.css";

// put the observer in a context, then it can be called in each object, and it avoids repetition and increases legibility.
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

    const elementsToObserve = document.querySelectorAll(
      "#title, #about, #CV, #stack",
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
          in Adelaide, taught in Roxby Downs, settled in Nantes, France and
          ready to join your team.
        </p>
      </article>
      <article
        id="stack"
        className={activeSection === "stack" ? "show" : "hidden"}
      >
        <h2>The Stack</h2>
        <p>
          React and JS at the front, and express and MySQL in the back...
          <br /> <br /> <br /> <br /> ...for now.
          <br />
          <br /> <br /> <br />
          I'm always open to learning a new language - to the point where I
          moved to France for it's linguistic allure.{" "}
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
