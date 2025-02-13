import { useEffect, useState } from "react";
import MessageForm from "../../components/MessageForm";

function Contact() {
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
        threshold: 0.75,
      },
    );

    const elementsToObserve = document.querySelectorAll("#title"); // Or any other selector

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
    <main id="title" className={activeSection === "title" ? "show" : "hidden"}>
      <h1>Contact</h1>
      <section id="contact-form">
        <MessageForm />
      </section>
    </main>
  );
}
export default Contact;
