import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import DataManipulator from "../components/common/DataManipulator";
import "../assets/styles/Dashboard.css";
import "../assets/styles/Profile.css";
import avatar from "../assets/images/avatar.jpg";

export default function Account() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarExpanded(false);
    } else {
      setIsSidebarExpanded(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  return (
    <div className="dashboard-container">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <Content />
    </div>
  );
}

function Content() {
  return (
    <div className="profile-section">
      <div>
        <h2>Profile</h2>
        <div className="avatar-section">
          <img src={avatar} alt="Avatar" className="avatar" />
          <button className="change-avatar-btn">Change avatar</button>
        </div>
      </div>
      <div className="profile-form">
        <form>
          <label>Name</label>
          <input type="text" placeholder="Your name" />

          <label>Email</label>
          <input type="email" placeholder="Your email" />

          <label>Password</label>
          <input type="password" placeholder="Your password" />

          <label>Date joined</label>
          <input type="text" placeholder="Date joined" />

          <label>About</label>
          <textarea placeholder="Tell us about yourself"></textarea>

          <button className="edit-profile-btn" type="submit">
            Edit profile
          </button>
        </form>
      </div>
    </div>
  );
}
