import React, { useEffect, useState, useRef } from "react";
import { assets } from "../../assets/assets";
import ImageComponent from "../ImageComponent/image";
import "./response.css";
import TypingEffect from "./typingeffect";
import FormModal from "./modal";
import { Link } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { motion } from "framer-motion";
import LogoutModal from "./modal";

export const Array = [];

function Response_Bar() {
  const [Display, setDisplay] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userModalBody, setUserModalBody] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const conversationContainerRef = useRef(null);

  // Retrieve from localStorage
  const getStoredUsername = () => localStorage.getItem("Username") || "Guest";
  const getStoredPhoto = () => localStorage.getItem("profilePhoto") || assets.user_icon;

  const [username, setUsername] = useState(getStoredUsername());
  const [profilePhoto, setProfilePhoto] = useState(getStoredPhoto());

  const cardPrompts = [
    "What is quantum computing",
    "What is React?",
    "Explain AI in simple terms",
    "How does JavaScript work?",
    "Best ways to learn coding?",
  ];

  // Dynamically update username if changed in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(getStoredUsername());
      setProfilePhoto(getStoredPhoto());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (conversationContainerRef.current) {
      setTimeout(() => {
        conversationContainerRef.current.scrollTo({
          top: conversationContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [conversation]);

  const handleLogout = () => {
    localStorage.removeItem("Username");
    localStorage.removeItem("profilePhoto");
    setUsername("Guest");
    setProfilePhoto(assets.user_icon);
  };

  const handleSend = async (currentPrompt) => {
    if (currentPrompt.trim() && !requestInProgress) {
      setPrompt("");
      setLoading(true);
      setDisplay(true);
      setRequestInProgress(true);

      Array.push(currentPrompt);
      setConversation((prev) => [...prev, { prompt: currentPrompt, response: "" }]);

      try {
        const res = await fetch("https://render-back-end-8.onrender.com/prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: currentPrompt }),
        });

        if (!res.ok) throw new Error("Failed to fetch AI response");

        const responseData = await res.json();
        setLoading(false);
        setConversation((prev) =>
          prev.map((entry) =>
            entry.prompt === currentPrompt ? { ...entry, response: responseData.response } : entry
          )
        );
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false);
        setConversation((prev) => [
          ...prev,
          { prompt: currentPrompt, response: "Sorry, there was an error. Please try again later." },
        ]);
      } finally {
        setRequestInProgress(false);
      }
    }
  };

  const handleNewChat = () => {
    setConversation([]);
    setPrompt("");
    setDisplay(false);
  };

  return (
    <div className="response-container">
      <div className="header">
        <div className="logo">
          <ImageComponent src={assets.Gemini_Advanced_logo} style={{ width: 150 }} />
        </div>

        <div className="scroll-box" title="Scroll Up">Hover over me!</div>

        <div className="nav">
          <div className="nav-name">
            <Link to="/trygemini">Try Advanced Gemini</Link>
          </div>
          <div className="nav-user-icon">
            {userModalBody ? (
              <LogoutModal setUserModalBody={setUserModalBody} />
            ) : (
              <ImageComponent
                src={profilePhoto}
                style={{ width: 50, borderRadius: "50%", cursor: "pointer" }}
                onClick={() => setUserModalBody(true)}
              />
            )}
          </div>
        </div>
      </div>

      {Display ? (
        <div className="dialog-box">
          <div ref={conversationContainerRef} className="conversation-history">
            {conversation.map((entry, index) => (
              <div key={index} className="message">
                <div className="prompt-display">
                  <p className="hello" style={{ fontSize: "1.2rem" }}>
                    <strong className="you">You :</strong> {entry.prompt}
                  </p>
                </div>
                {entry.response ? (
                  <div className="response-display">
                    <TypingEffect text={entry.response} delay={30} />
                  </div>
                ) : (
                  loading && (
                    <div className="loader">
                      <SyncLoader color="#36D7B7" size={10} margin={5} />
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="main">
          <div className="greet">
            <p><span>Hello {username}</span></p>
            <p>How can I help you?</p>
          </div>

          <div className="cards-container">
            {cardPrompts.map((text, index) => (
              <motion.div
                key={index}
                className="prompt-card"
                onClick={() => handleSend(text)}
                whileHover={{ scale: 1.05, backgroundColor: "#e0f7fa" }}
                whileTap={{ scale: 0.95 }}
              >
                {text}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <motion.button
        className="floating-new-chat-btn"
        onClick={handleNewChat}
        whileHover={{
          scale: 1.1,
          backgroundColor: "#2bb597",
          boxShadow: "0px 0px 15px rgba(54, 215, 183, 0.8)",
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        New Chat
      </motion.button>

      <div className="footer">
        <div className="input-bar">
          <input
            type="text"
            style={{ backgroundColor: toggle ? "black" : "white", color: toggle ? "white" : "black" }}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            placeholder="Enter your prompt"
            onKeyDown={(e) => e.key === "Enter" && handleSend(prompt)}
          />
        </div>

        <div className="additional-icons">
          <div className="send-icon">
            {!requestInProgress && prompt.trim() && (
              <ImageComponent src={assets.send_icon} style={{ width: 30, cursor: "pointer" }} onClick={() => handleSend(prompt)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Response_Bar;
