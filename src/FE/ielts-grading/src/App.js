import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/Landing.css";
import "./styles/Loading.css";

// Import component Loading
const Loading = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

// Lazy load các components
const LoginForm = React.lazy(() => import("./pages/LoginForm"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const Registration = React.lazy(() => import("./pages/Registration"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Problems = React.lazy(() => import("./pages/Problems"));
const Recommended = React.lazy(() => import("./pages/Recommended"));
const History = React.lazy(() => import("./pages/History"));
const Profile = React.lazy(() => import("./pages/Profile"));
const SampleArticle = React.lazy(() => import("./pages/SampleArticle"));
const WritingPage = React.lazy(() => import("./pages/WritingPage"));
const Result = React.lazy(() => import("./pages/Result"));
const Sidebar = React.lazy(() => import("./components/Sidebar/Sidebar"));
const PrivateRoute = React.lazy(() => import("./components/PrivateRoute"));
const DashboardAdmin = React.lazy(() => import("./pages/DashboardAdmin"));
const UserList = React.lazy(() => import("./pages/UserList"));
const TaskList = React.lazy(() => import("./pages/TaskList"));
const ProfileAdmin = React.lazy(() => import("./pages/ProfileAdmin"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
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
            path="/admin-dashboard"
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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
