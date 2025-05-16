import { useRef } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const myNav = useRef<HTMLDivElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const showLogin = useRef<HTMLFormElement>(null);

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

  function setShowLogin() {
    if (showLogin.current) {
      showLogin.current.style.display = "block";
    }
  }
  function hideLogin() {
    if (showLogin.current) {
      showLogin.current.style.display = "none";
    }
  }
  function toggleLogin() {
    if (showLogin.current) {
      if (showLogin.current.style.display === "block") {
        hideLogin();
      } else {
        setShowLogin();
      }
    }
  }

  function submitLogin(event: React.FormEvent) {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    // Perform login logic here

    console.warn("Email:", email);
    console.warn("Password:", password);
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
            <li>
              <NavLink to="/admin" onClick={closeNav}>
                Admin
              </NavLink>
            </li>
          </ul>
          <button type="button" className="loginbtn" onClick={toggleLogin}>
            login
          </button>

          <form className="login-form" ref={showLogin}>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            <button type="submit" onClick={submitLogin}>
              Submit
            </button>
          </form>
          <button type="button" className="closebtn" onClick={toggleLogin}>
            hide
          </button>
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
