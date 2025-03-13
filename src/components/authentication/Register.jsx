import { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Appa } from '../Notify/notify';
import "./Register.css"
import { assets } from '../../assets/assets';

export default function SignupPage() {
  const navigate = useNavigate();
  const baseUrl = 'https://render-back-end-8.onrender.com';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [otpRequested, setOtpRequested] = useState(null);
  const [signupmessage,setsignupmessage] = useState(false)


  const validateInputs = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';
    else if (!passwordRegex.test(password)) newErrors.password = 'Password must include an uppercase letter and a special symbol.';
    if (otpRequested && !otp) newErrors.otp = 'OTP is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.message === 'resgistered successfully') {
        // alert('You have registered successfully!');
        setsignupmessage('You have registered successfully!')
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        // alert(data.message || "error message ");
        setsignupmessage("Username already taken")
      }
    } catch (error) {
      // alert('An error occurred while registering.');
      setsignupmessage("An error occurred while registering.")
    }
  };

  const handleOtpClick = async () => {
    if (!username.trim()) {
      setErrors({ username: 'Username is required to get OTP.' });
      return;
    }
    try {
     const res = await fetch(`${baseUrl}/getotp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
    
      if(!res.ok){
        setOtpRequested(data.message || "Failed to send otp")
      return;
      }
      
        setOtp(data.otp)
      setOtpRequested(true);
      // alert('OTP sent successfully.');
    setOtpRequested("Otp Sent")
      
    } catch (error) {
  setOtpRequested(error)
      // alert('An error occurred while sending OTP hello.');
    // console.log(error)
    }
  };

  return (
    <Box className="seperator"sx={{display : "flex",justifyContent: 'center', gap : "10%" ,alignItems: 'center',  }} >
       <Typography className="image" variant="h3" sx={{ fontWeight: 'bold', display : "inline-flex", gap: " 50px", color: '#1976d2', textAlign: 'center', paddingBottom: '0px' }}>
       <img className='imagecontainer' src={assets.unnamed} alt="register image " style={{width : "45%"}} />
        </Typography>
      <Box  className="container1"  sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center',marginLeft : "-30%"}}>
       
      <Box className="container"  sx={{ width: '350px', p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center', paddingBottom: '20px' }}>
          Gemini AI
        </Typography>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Signup
        </Typography>
        <form className='form_element' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} error={!!errors.username} helperText={errors.username} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
            </Grid>
            {otpRequested  && otpRequested === "Otp Sent" && (
              <Grid item xs={12}>
                <TextField fullWidth label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} error={!!errors.otp} helperText={errors.otp} />
              </Grid>
            )}
            { otpRequested != "Otp Sent" && (
              <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={handleOtpClick}>
                  Get OTP
                </Button>
                
              </Grid>
            )}
            <div    style={{backgroundColor : "blue"}}>
            {otpRequested && <Appa  action={otpRequested} />}
            </div>
            <Grid item xs={12}>
              { otpRequested === "Otp Sent" &&
                <Button fullWidth variant="contained"  color="primary" type="submit" disabled={!otpRequested}>
                Signup
              </Button>
              }
              {signupmessage && <Appa  action={signupmessage} />}
  
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="text" color="secondary" onClick={() => navigate('/')}>Already have an account? Login</Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box className="btns" sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
        color="primary"
          variant="contained"
          sx={{  margin: 1 }}
          startIcon={<FontAwesomeIcon icon={faGooglePlay} />}
        >
         <Link style={{color : "white",fontWeight : "400" }} to="https://www.google.com/search?q=goggle+gemein+ai+playstore&rlz=1C1CHBF_enIN1139IN1139&oq=goggle+gemein+ai+playstore&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMg0IAxAAGIYDGIAEGIoFMg0IBBAAGIYDGIAEGIoFMg0IBRAAGIYDGIAEGIoF0gEINTQxNWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8" >Get it on Play store</Link>
        </Button>

        <Button
            color="primary"
          variant="contained"
          sx={{color: '#fff', margin: 1 }}
          startIcon={<FontAwesomeIcon icon={faMicrosoft} />}
        >
         <Link style={{color : "white",fontWeight : "400" }} to="https://www.bing.com/search?pglt=2339&q=goggle+gemein+ai+playstore&cvid=d5d2594a86c146128a1ac267d9cc28e3&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEDSAQc4NjNqMGoxqAIAsAIA&FORM=ANNTA1&PC=U531">Get it on Microsoft</Link>
        </Button>
      </Box>
    </Box>
    </Box>
  );
}

