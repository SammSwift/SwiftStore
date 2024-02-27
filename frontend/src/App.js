import Header from "./components/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterCard from "./components/FooterCard";
import "./App.css";
function App() {
  return (
    <>
      <main className="overflow-x-hidden">
        <Header />
        <Outlet />
        <FooterCard />
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
