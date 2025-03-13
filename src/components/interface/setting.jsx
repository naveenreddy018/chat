import React, { useState } from "react";

export const photo = [];

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("Naveen Reddy");
  const [email, setEmail] = useState("naveen@example.com");
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  if (profilePicture && !photo.includes(profilePicture)) {
    photo.push(profilePicture);
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="tab-content">
            <h3>Profile Settings</h3>
            <div className="field">
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="field">
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Profile Picture:</label>
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
              {profilePicture && <img src={profilePicture} alt="Profile Preview" className="profile-picture" />}
            </div>
          </div>
        );
      case "security":
        return (
          <div className="tab-content">
            <h3>Security Settings</h3>
            <div className="field">
              <label>Change Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="tab-content">
            <h3>Notification Settings</h3>
            <div className="field">
              <label>
                <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                Email Notifications
              </label>
            </div>
            <div className="field">
              <label>
                <input type="checkbox" checked={smsNotifications} onChange={() => setSmsNotifications(!smsNotifications)} />
                SMS Notifications
              </label>
            </div>
          </div>
        );
      case "theme":
        return (
          <div className="tab-content">
            <h3>Theme Settings</h3>
            <div className="field">
              <label>Theme:</label>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="toggle-button">
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`settings-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="sidebar">
        <h2 style={{color : "black"}}>Settings</h2>
        <ul>
          <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
            Profile
          </li>
          <li className={activeTab === "security" ? "active" : ""} onClick={() => setActiveTab("security")}>
            Security
          </li>
          <li className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
            Notifications
          </li>
          <li className={activeTab === "theme" ? "active" : ""} onClick={() => setActiveTab("theme")}>
            Theme
          </li>
        </ul>
      </div>
      <div className="content">{renderTabContent()}</div>

      <style jsx>{`
        /* Global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background-color: #f4f4f4;
          color: #333;
          font-size: 16px;
        }

        /* Dark mode styles */
        .dark-mode {
          background-color: #333;
          color:black;
        }

        .light-mode {
          background-color: #fff;
          color: #333;
        }

        /* Settings container */
        .settings-container {
          display: flex;
          min-height: 100vh;
          flex-direction: row;
          justify-content: space-between;
          padding: 20px;
        }

        .settings-container .sidebar {
          width: 250px;
          background-color: #f1f1f1;
          padding: 20px;
          border-radius: 8px;
          margin-right: 20px;
        }

        .settings-container .sidebar h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .settings-container .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .settings-container .sidebar ul li {
          padding: 10px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .settings-container .sidebar ul li.active,
        .settings-container .sidebar ul li:hover {
          background-color:skyblue;
          color: white;
        }

        .settings-container .content {
          flex-grow: 1;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .tab-content {
          margin-top: 20px;
        }

        .field {
          margin-bottom: 20px;
        }

        .field label {
          display: block;
          margin-bottom: 5px;
        }

        .field input[type="text"],
        .field input[type="email"],
        .field input[type="password"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        .field input[type="file"] {
          margin-top: 10px;
        }

        .profile-picture {
          margin-top: 10px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }

        .toggle-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: black;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .toggle-button:hover {
          background-color: #0056b3;
        }

        @media screen and (max-width: 768px) {
          .settings-container {
            flex-direction: column;
          }

          .settings-container .sidebar {
            width: 100%;
            margin-right: 0;
          }

          .settings-container .content {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Settings;
