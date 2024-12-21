import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Upload } from "lucide-react";
import "../styles/Common.css";
import "../styles/Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "********",
    dateJoined: "2023-01-15",
    about: "Stay hungry, stay foolish!",
  });
  const [avatar, setAvatar] = useState("https://avatar.iran.liara.run/public/4");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-avatar-section">
              <div className="avatar-wrapper">
                <img
                  src={avatar}
                  alt="Profile"
                  className="profile-avatar"
                />
              </div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="avatar-upload" className="change-avatar-button">
                <Upload size={16} />
                Change avatar
              </label>
            </div>

            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={profileData.password}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateJoined">Date joined</label>
                <input
                  type="text"
                  id="dateJoined"
                  name="dateJoined"
                  value={profileData.dateJoined}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  rows="4"
                  value={profileData.about}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                ></textarea>
              </div>
              <button type="button" className="edit-profile-button" onClick={handleEdit}>
                {isEditing ? "Save Profile" : "Edit Profile"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;