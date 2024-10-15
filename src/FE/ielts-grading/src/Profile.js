import React from "react";
import "./Profile.css";
import dashboard from "./Images/house-solid.svg";
import problem from "./Images/code-fork-solid.svg";
import history from "./Images/arrow-trend-up-solid.svg";
import sample from "./Images/file-regular.svg";
import account from "./Images/user-regular.svg";
import settings from "./Images/sliders-solid.svg";
import signout from "./Images/arrow-right-from-bracket-solid.svg";
import avatar from "./Images/avatar.jpg";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>WriteAce</h2>
      <ul>
        <li>
          <a href="#">
            <img src={dashboard} alt="dashboard" />
            <span>Dashboard</span>
          </a>
        </li>

        <li>
          <a href="#">
            <img src={problem} alt="problem" />
            <span>Problems</span>
          </a>
        </li>

        <li>
          <a href="#">
            <img src={history} alt="history" />
            <span>History</span>
          </a>
        </li>

        <li>
          <a href="#">
            <img src={sample} alt="sample" />
            <span>Sample</span>
          </a>
        </li>

        <li>
          <a href="#">
            <img src={account} alt="account" />
            <span>Account</span>
          </a>
        </li>
      </ul>

      <ul>
        <li>
          <a href="#">
            <img src={settings} alt="settings" />
            <span>Settings</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={signout} alt="signout" />
            <span>Sign out</span>
          </a>
        </li>
      </ul>
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

export default function Profile() {
  return (
    <div class="container">
      <Sidebar />
      <Content />
    </div>
  );
}
