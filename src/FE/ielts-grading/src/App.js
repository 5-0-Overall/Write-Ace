import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/Landing.css";
import "./styles/Loading.css";
import { ProblemProvider } from "./contexts/ProblemContext";
import LoginForm from "./pages/LoginForm";
import ResetPassword from "./pages/ResetPassword";
import Registration from "./pages/Registration";
import LandingPage from "./pages/LandingPage";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Recommended from "./pages/Recommended";
import History from "./pages/History";
import Profile from "./pages/Profile";
import SampleArticle from "./pages/SampleArticle";
import WritingPage from "./pages/WritingPage";
import Result from "./pages/Result";
import Sidebar from "./components/Sidebar/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import DashboardAdmin from "./pages/DashboardAdmin";
import UserList from "./pages/UserList";
import TaskList from "./pages/TaskList";
import ProfileAdmin from "./pages/ProfileAdmin";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherGrading from "./pages/TeacherGrading";

function App() {
  return (
    <ProblemProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/problems"
            element={
              <PrivateRoute>
                <Problems />
              </PrivateRoute>
            }
          />
          <Route
            path="/recommend"
            element={
              <PrivateRoute>
                <Recommended />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/writing/problems/:id"
            element={
              <PrivateRoute>
                <WritingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/sample-article"
            element={
              <PrivateRoute>
                <SampleArticle />
              </PrivateRoute>
            }
          />
          <Route
            path="/result/:id"
            element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <DashboardAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile_admin"
            element={
              <PrivateRoute>
                <ProfileAdmin />
              </PrivateRoute>
            }
          />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/grading" element={<TeacherGrading />} />
        </Routes>
      </Router>
    </ProblemProvider>
  );
}

export default App;
