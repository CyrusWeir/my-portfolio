import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
