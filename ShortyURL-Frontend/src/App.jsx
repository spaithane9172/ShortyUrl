import "./App.css";
import Authenticate from "./pages/Authenticate";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Navbar from "./components/Navigations/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { Context } from "./context/AppContext";

function App() {
  const { setMode } = useContext(Context);
  useEffect(() => {
    if (localStorage?.getItem("mode") === "dark") {
      setMode(false);
    } else {
      setMode(true);
    }
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000} // milliseconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // "light", "dark", or "colored"
        limit={2}
      />

      <Router>
        <Navbar />
        <div className="pt-[3rem]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Authenticate />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
