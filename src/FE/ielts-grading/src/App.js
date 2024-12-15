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
import SampleArticle from "./pages/SampleArticle";
import WritingPage from "./pages/WritingPage";
import Result from "./pages/Result";
import './App.css';
import './styles/Landing.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />{" "}
        <Route path="/reset-password" element={<ResetPassword />} />{" "}
        <Route path="/register" element={<Registration />} />{" "}
        <Route path="/" element={<LandingPage />} /> {/* Landing page */}
        <Route path="/contact" element={<Contact />} /> {/*Contact */}
        <Route path="*" element={<h1>404 Not Found</h1>} /> {/* 404 page */}
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/problems" element={
          <PrivateRoute>
            <Problems />
          </PrivateRoute>
        } />
        <Route path="/recommend" element={
          <PrivateRoute>
            <Recommended />
          </PrivateRoute>
        } />
        <Route path="/history" element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/writing" element={
          <PrivateRoute>
            <WritingPage />
          </PrivateRoute>
        } />
        <Route path="/sample-article" element={
          <PrivateRoute>
            <SampleArticle />
          </PrivateRoute>
        } />
        <Route path="/result" element={
          <PrivateRoute>
            <Result />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
