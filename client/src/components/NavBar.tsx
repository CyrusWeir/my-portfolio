import { useRef } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const myNav = useRef<HTMLDivElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);

  function openNav() {
    if (myNav.current) {
      // Check if the ref is attached
      myNav.current.style.width = "100%";
    }
    if (openButton.current) {
      openButton.current.style.display = "none";
    }
  }

  function closeNav() {
    if (myNav.current) {
      // Check if the ref is attached
      myNav.current.style.width = "0%";
    }
    if (openButton.current) {
      openButton.current.style.display = "block";
    }
  }
  return (
    <section>
      <div ref={myNav} className="overlay">
        <button type="button" className="closebtn" onClick={closeNav}>
          &times;
        </button>

        <nav className="navigation-bar">
          <ul>
            <li>
              <NavLink to="/" onClick={closeNav}>
                Home
              </NavLink>
            </li>{" "}
            {/* Added <li> tags for better structure */}
            <li>
              <NavLink to="/projects" onClick={closeNav}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeNav}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <button
        type="button"
        className="openbtn"
        ref={openButton}
        onClick={openNav}
      >
        ☰
      </button>
    </section>
  );
}

export default NavBar;
