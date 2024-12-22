import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Upload } from "lucide-react";
import "../styles/Common.css";
import "../styles/Profile.css";
import { UserApi } from "../services/ApiService";
import { ToastContainer } from "react-toastify";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
    description: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await UserApi.getCurrentUser();
      const userData = response.data;
      setProfileData({
        username: userData.username,
        email: userData.email,
        password: "",
        description: userData.description || "",
      });
      setAvatar(userData.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgGApOABX6L1KTXg0XzCOQgvFzieFvdK3rw&s' );
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleResize = () => {
    setIsSidebarExpanded(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const formData = new FormData();
        formData.append('email', profileData.email);
        formData.append('description', profileData.description);
        if (profileData.password) {
          formData.append('password', profileData.password);
        }
        if (avatarFile) {
          formData.append('avatarFile', avatarFile);
        }

        await UserApi.updateProfile(formData);
        await loadUserProfile();
        setProfileData(prev => ({...prev, password: ""}));
        setAvatarFile(null);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelAvatarChange = () => {
    setAvatarFile(null);
    loadUserProfile();
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content">
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-avatar-section">
              <div 
                className="avatar-wrapper"
                style={{ 
                  opacity: isEditing ? 1 : 0.7,
                  cursor: isEditing ? 'pointer' : 'default'
                }}
              >
                <img
                  src={avatar}
                  alt="Profile"
                  className="profile-avatar"
                />
              </div>
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                  <div className="avatar-controls">
                    <label 
                      htmlFor="avatar-upload" 
                      className="change-avatar-button"
                    >
                      <Upload size={16} />
                      Change avatar
                    </label>
                    {avatarFile && (
                      <button 
                        type="button" 
                        className="cancel-avatar-button"
                        onClick={handleCancelAvatarChange}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profileData.username}
                  readOnly={true}
                  className="readonly-input"
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
                  placeholder={isEditing ? "Enter new password" : "********"}
                  className={!isEditing ? "readonly-input" : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={profileData.description}
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