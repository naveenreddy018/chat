import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { Appa } from '../Notify/notify';

export const Username = [];

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginmessage, setloginmessage] = useState(""); 
    const [guestlogin,setguest] = useState("")


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/profile');  
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();


    
        setTimeout(() => {
            setloginmessage("");  
        }, 3000);  

    
        if (username === "" || password === "") {
            setloginmessage("Please enter both username and password.");
            return; 
        }

        Username.push(username);

        try {
            const res = await fetch("https://render-back-end-8.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", JSON.stringify(data.token1));
                setloginmessage(`Login successful! Redirecting...`);

                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
            } else {
                setloginmessage(data.message || "Login failed");
            }
        } catch (error) {
            setloginmessage("An error occurred while logging in.");
            console.error("Login error:", error);
        }

    
        // if (clickCount >= 4) {
        //     setClickCount(0);  
        // }
    };

    const handleGuestLogin = () => {
        setguest("Login successful!  as guest Redirecting...")
        Username.push("guest");
     setTimeout(() => {
        navigate('/auth'); 
     }, 2000);
    };

    const handleRegisterRedirect = () => {
        navigate("/register");  
    };

   
    return (
        <div style={styles.container}>
            <form id="login" onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.header}>Login to Gemini AI</h2>
                <label htmlFor="name" style={styles.label}>Username</label>
                <input 
                    id="name"
                    type="text"
                    value={username}
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <label htmlFor="pass" style={styles.label}>Password</label>
                <input 
                    id="pass"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <input type="submit" value="Login" style={styles.submitBtn} />
                
                <div style={styles.loginRedirectContainer}>
                    <p style={styles.pTag}>Don't have an account? 
                        <span onClick={handleRegisterRedirect} style={styles.registerLink}> Register here</span>
                    </p>
                </div>
            </form>

            {/* Display the login message as toast */}
            {loginmessage && <Appa action={loginmessage} />}

            <div style={styles.guestLoginContainer}>
                <p style={styles.pTag}>Login as Guest:</p>
                {guestlogin && <Appa action={guestlogin} />}
                <button onClick={handleGuestLogin} style={styles.guestButton}>Guest User</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f9',
        padding: '20px',
        backgroundImage: "url('https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: "-10000"
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
        color: '#3f51b5',
    },
    label: {
        fontSize: '16px',
        marginBottom: '8px',
        display: 'block',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    submitBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    loginRedirectContainer: {
        textAlign: 'center',
        marginTop: '15px',
    },
    pTag: {
        fontSize: '1.3rem',
        marginBottom: '10px',
        fontWeight: "500",
        color: "blue"
    },
    registerLink: {
        color: '#3f51b5',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    guestLoginContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    guestButton: {
        padding: '12px 20px',
        backgroundColor: '#e91e63',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default Login;
