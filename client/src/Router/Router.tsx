import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Admin from "../pages/Admin/Admin";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import ModifyProject from "../pages/ModifyProject/ModifyProject";
import Projects from "../pages/Projects/Projects";

const router = createBrowserRouter([
  {
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/", // The root path
        element: <Home />, // Renders the App component for the home page
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/modify-project/:id",
        element: <ModifyProject />,
      },
    ],
    // Try adding a new route! For example, "/about" with an About component
  },
]);

export default router;
