import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import ResetPassword from "./pages/ResetPassword";
import Registration from "./pages/Registration";
import LandingPage from "./pages/LandingPage";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Recommended from "./pages/Recommended";
import History from "./pages/History";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./pages/Profile";
import RecommendedWriting from "./pages/RecommendedWriting"
// import Settings from "./Settings";
// import SignOut from "./SignOut";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />{" "}
        {/* Default route is login page */}
        <Route path="/reset-password" element={<ResetPassword />} />{" "}
        {/* Reset password page */}
        <Route path="/register" element={<Registration />} />{" "}
        {/* Registration page */}
        <Route path="/" element={<LandingPage />} /> {/* Landing page */}
        <Route path="/contact" element={<Contact />} /> {/*Contact */}
        <Route path="*" element={<h1>404 Not Found</h1>} /> {/* 404 page */}
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/*Dashboard*/}
        <Route path="/problems" element={<Problems />} /> {/*Problems*/}
        <Route path="/recommend" element={<Recommended />} /> {/*Recommended*/}
        <Route path="/history" element={<History />} /> {/*History*/}
        <Route path="/profile" element={<Profile />} /> {/*Profile*/}
        <Route path="/recommended-writing" element={<RecommendedWriting />} />
        {/* <Route path="/settings" element={<Settings />} /> Settings */}
        {/* <Route path="/signout" element={<SignOut />} /> SignOut */}
      </Routes>
    </Router>
  );
}

export default App;
