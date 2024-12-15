import React, { useState, useEffect } from "react";
import { useSidebar } from "../context/SidebarContext";
import { Bell, Upload } from "lucide-react";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Common.css";
import "../styles/Profile.css";

function Profile() {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    dateJoined: "",
    about: "",
  });
  const [avatar, setAvatar] = useState(null);

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/profile');
      if (response.data) {
        setProfileData(response.data);
        setAvatar(response.data.avatar || "https://avatar.iran.liara.run/public/4");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await axios.post('http://localhost:3000/profile/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.avatarUrl) {
          setAvatar(response.data.avatarUrl);
        }
      } catch (err) {
        console.error("Error uploading avatar:", err);
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        setLoading(true);
        const response = await axios.put('http://localhost:3000/profile', profileData);
        if (response.data) {
          setProfileData(response.data);
        }
        setIsEditing(false);
      } catch (err) {
        console.error("Error updating profile:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content">
        <div className="main-header">
          <div className="header-title">
            <h2 className="main-title">Profile Settings</h2>
          </div>
          <div className="header-controls">
            <button className="icon-button">
              <Bell size={20} />
            </button>
          </div>
        </div>

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

            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={!isEditing ? 'readonly' : ''}
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
                  className={!isEditing ? 'readonly' : ''}
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
                  className={!isEditing ? 'readonly' : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateJoined">Date joined</label>
                <input
                  type="text"
                  id="dateJoined"
                  name="dateJoined"
                  value={new Date(profileData.dateJoined).toLocaleDateString()}
                  readOnly
                  className="readonly"
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
                  className={!isEditing ? 'readonly' : ''}
                ></textarea>
              </div>
              <button 
                type="button" 
                className="edit-profile-button"
                onClick={handleEdit}
                disabled={loading}
              >
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