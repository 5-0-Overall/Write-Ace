import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import ResetPassword from "./ResetPassword";
import Registration from "./Registration";
import LandingPage from "./LandingPage";
import Contact from "./Contact";
import Profile from "./Profile";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<LoginForm />} /> {/* Default route is login page */}
    //     <Route path="/reset-password" element={<ResetPassword />} /> {/* Reset password page */}
    //     <Route path="/register" element={<Registration />} /> {/* Registration page */}
    //     <Route path="/" element={<LandingPage />} /> {/* Landing page */}
    //     <Route path="/contact" element={<Contact/>} /> {/*Contact */}
    //     <Route path="*" element={<h1>404 Not Found</h1>} /> {/* 404 page */}
    //   </Routes>
    // </Router>
    <Profile />
  );
}

export default App;
