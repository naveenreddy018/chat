import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Switch,
  Button,
  FormControlLabel,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        background: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Profile Settings */}
      <Card style={{ marginBottom: "20px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h6">Profile Settings</Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <Avatar src={profilePic} sx={{ width: 70, height: 70 }} />
            <input
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              id="upload-avatar"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-avatar">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <TextField fullWidth label="Name" variant="outlined" margin="normal" />
          <TextField fullWidth label="Email" variant="outlined" margin="normal" />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: "10px" }}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Dark Mode Toggle */}
      <Card style={{ marginBottom: "20px", padding: "20px" }}>
        <CardContent>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
            label="Dark Mode"
          />
        </CardContent>
      </Card>

      {/* Notifications Toggle */}
      <Card style={{ padding: "20px" }}>
        <CardContent>
          <FormControlLabel
            control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} />}
            label="Notifications"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;