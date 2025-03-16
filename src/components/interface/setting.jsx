import React, { useState } from "react";
import "./setting.css"
import {
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Switch,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import {
  PhotoCamera,
  Visibility,
  VisibilityOff,
  AccountCircle,
  Lock,
  Brightness4,
  Notifications,
  ExitToApp,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Array_photo = []

const SettingsDashboard = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [transition, setTransition] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [name, setName] = useState("Naveen Reddy");
  const [email, setEmail] = useState("naveen@example.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(localStorage.getItem("emailNotifications") === "true");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [save,setsave] = useState(false)

  if (profilePic !== null) {
    Array_photo.length = 0;
    Array_photo.push(profilePic);
  } else {
    // Array_photo = [];
  }
  
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setProfilePic(imgUrl);
    }
  };

  const handleSaveChanges = () => {
    setShowSnackbar(true);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    navigate("/");
  };

 

  return (
    <Container maxWidth="md" sx={{ display: "flex", marginTop: "50px" }}>
      <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
        <Button  style={{position : "relative" , top : "50%", left : "20%",width : "60%",fontSize : "1rem",padding : "10px 30px"}} variant="contained" color="primary" onClick={() => navigate("/auth")} startIcon={<ArrowBack />}>
          Back
        </Button>
        <Typography variant="h5" align="center">Settings</Typography>
        <List>
          {["Profile", "Password", "Theme", "Notifications", "Logout"].map((item) => (
            <ListItem button key={item} selected={selectedSection === item} onClick={() => setSelectedSection(item)}>
              <ListItemIcon>{
                item === "Profile" ? <AccountCircle /> :
                item === "Password" ? <Lock /> :
                item === "Theme" ? <Brightness4 /> :
                item === "Notifications" ? <Notifications /> :
                <ExitToApp />
              }</ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container sx={{ flexGrow: 1, paddingLeft: "260px" }}>
        <Slide direction="left" in={transition} mountOnEnter unmountOnExit>
          <Card sx={{ padding: "20px" }}>
            <CardContent>
              {selectedSection === "Profile" && (
                <>
                  <Typography variant="h6">Profile Settings</Typography>
                  <Avatar src={profilePic} sx={{ width: 80, height: 80 }} />
                  <label htmlFor="upload-avatar">
                    <input accept="image/*" type="file" id="upload-avatar" style={{ display: "none" }} onChange={handleFileChange} />
                    <IconButton component="span"><PhotoCamera /></IconButton>
                  </label>
                  <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Button  variant="contained" color="primary" fullWidth onClick={handleSaveChanges}>Save Changes</Button>
                  {
                  email.length != "" &&  name.length !== "" && showSnackbar && <h2>successfully saved your details</h2>
                  }
                </>
              )}

              {selectedSection === "Password" && (
                <>
                  <Typography variant="h6">Change Password</Typography>
                  <TextField fullWidth label="New Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
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
                  <Button variant="contained" color="primary" fullWidth onClick={handleSaveChanges}>Update Password</Button>
                  {
                      password.length !== "" &&  showSnackbar && <h2>successfully saved your details</h2>
                  }
                </>
              )}

              {selectedSection === "Theme" && (
                <>
                  <Typography variant="h6">Theme Settings</Typography>
                  <Switch checked={darkMode} onChange={() => {
                    setDarkMode(!darkMode);
                    localStorage.setItem("darkMode", !darkMode);
                  }} />
                  Dark Mode
                </>
              )}

              {selectedSection === "Notifications" && (
                <>
                  <Typography variant="h6">Notification Settings</Typography>
                  <Switch checked={emailNotifications} onChange={() => {
                    setEmailNotifications(!emailNotifications);
                    localStorage.setItem("emailNotifications", !emailNotifications);
                  }} />
                  Email Notifications
                </>
              )}

              {selectedSection === "Logout" && (
                <>
                  <Typography variant="h6">Logout</Typography>
                    <DialogContent><DialogContentText>Before logging out, your changes will be saved. Do you want to continue?</DialogContentText></DialogContent>
                  <Button variant="contained" color="secondary" onClick={() => setLogoutDialogOpen(true)}>Logout</Button>
                </>
              )}
            </CardContent>
          </Card>
        </Slide>
      </Container>

      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent><DialogContentText>Are you sure you want to logout?</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="secondary">Logout</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={() => setShowSnackbar(false)}>
        <Alert severity="success">Changes saved successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default SettingsDashboard;
