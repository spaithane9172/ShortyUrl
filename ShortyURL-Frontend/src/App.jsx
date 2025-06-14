import "./App.css";
import Authenticate from "./pages/Authenticate";
import Registration from "./pages/Registration";
import Navbar from "./components/Navigations/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="pt-[3rem]">
          <Routes>
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
