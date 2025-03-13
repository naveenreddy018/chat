import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./GeminiSubscription.css";
import { Link } from "react-router-dom";

const GeminiSubscription = () => {
  const [isStarting, setIsStarting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(100);

  const handleStartTrial = () => {
    setIsStarting(true);
    setCountdown(3);
    setProgress(100);

    // Confetti animation for stars
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffcc00", "#ff6699", "#00ccff", "#ff3366"],
    });

    // Start countdown effect
    let timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : "Start!"));
      setProgress((prev) => (prev > 0 ? prev - 33.3 : 0));
    }, 1000);

    // Reset after 3 seconds
    setTimeout(() => {
      clearInterval(timer);
      setIsStarting(false);
    }, 3500);
  };

  return (
    <motion.div className={`subscription-container ${isStarting ? "start-bg" : ""}`}>
      <motion.div
        className="subscription-card"
        animate={isStarting ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="title">
          <span className="gemini">Gemini</span> <span className="advanced">Advanced</span>
        </h1>
        <p className="description">
          Get Gemini Advanced and more with a Google One AI Premium plan
        </p>

        {isStarting && (
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Premium is going to start shortly...
          </motion.p>
        )}

        <div className="pricing">
          <p className="offer">
            <span className="original-price">₹1,950</span> <span className="discounted-price">₹0</span> for 1 month,
          </p>
          <p className="after-price">₹1,950/month after</p>
        </div>

        <ul className="features">
          <li>✅ With our most capable AI models</li>
          <li>✅ Priority access to new features</li>
        </ul>

       <div style={{display : "flex" , flexDirection : "column" , gap : "20px"}}>
       <motion.button
          className="start-trial"
          onClick={handleStartTrial}
          whileTap={{ scale: 0.9 }}
          animate={{ backgroundColor: isStarting ? "#27ae60" : "#007bff" }}
          transition={{ duration: 0.3 }}
        >
          {isStarting ? "Premium is going to start shortly.................." : "Start Trial"}
        </motion.button>
        <motion.button
          className="start-trial"
          
          whileTap={{ scale: 0.9 }}
          animate={{ backgroundColor: isStarting ? "#27ae60" : "#007bff" }}
          transition={{ duration: 0.3 }}
        >
          {isStarting ? <Link to="/auth">Back to main page</Link> : <Link to="/auth">Back to main page</Link>}
        </motion.button>
       </div>
        

        {isStarting && (
          <div className="countdown-container">
            <motion.div
              className="countdown"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CircularProgressbar
                value={progress}
                text={countdown}
                styles={buildStyles({
                  pathColor: "#ff3366",
                  textColor: "#000",
                  trailColor: "#ddd",
                  textSize: "20px",
                })}
              />
            </motion.div>
          </div>
        )}

        <p className="terms">Cancel anytime. No refunds for partial billing periods.</p>
      </motion.div>
    </motion.div>
  );
};

export default GeminiSubscription;
