import React, { useEffect, useState, useRef } from "react";
import { FaCopy, FaShareAlt, FaThumbsUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TypingEffect = ({ text, delay = 30 }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [liked, setLiked] = useState(false);
  const [stars, setStars] = useState([]);
  const textContainerRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const userScrolledRef = useRef(false);

  useEffect(() => {
    if (!text || typingIntervalRef.current) return;

    let sanitizedText = text.replace(/\*/g, " ");
    sanitizedText = sanitizedText.replace(/(\d+)/g, "\n$1");

    let startIdx = index;
    let endIdx = Math.min(startIdx + 1000, sanitizedText.length);
    let truncatedText = sanitizedText.slice(startIdx, endIdx);

    let charIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      if (charIndex < truncatedText.length) {
        setDisplayText(sanitizedText.slice(0, startIdx + charIndex + 1));
        charIndex += 1;

        setTimeout(() => {
          if (textContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = textContainerRef.current;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;

            if (!userScrolledRef.current || isAtBottom) {
              textContainerRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
            }
          }
        }, 20);
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setShowContinue(endIdx < sanitizedText.length);
        setShowButtons(!showContinue);
      }
    }, Math.max(5, delay / 3));

    return () => {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    };
  }, [index, text, delay]);

  const handleContinue = () => {
    setIndex((prev) => prev + 1000);
    setShowContinue(false);
    setShowButtons(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayText).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: displayText });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const handleLike = () => {
    setLiked(true);
    setStars([...stars, ...Array.from({ length: 5 }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))]);
    setTimeout(() => setLiked(false), 1000);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={textContainerRef}
        style={{
          color: "black",
          fontSize: "0.9rem",
          maxHeight: "450px",
          overflowY: "auto",
          padding: "10px",
          whiteSpace: "pre-line",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        {displayText}
        {showButtons && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <FaCopy style={{ cursor: "pointer" }} onClick={handleCopy} title="Copy" />
            <FaShareAlt style={{ cursor: "pointer" }} onClick={handleShare} title="Share" />
            <FaThumbsUp
              style={{ cursor: "pointer", color: liked ? "gold" : "black" }}
              onClick={handleLike}
              title="Like"
            />
          </div>
        )}
        {showContinue && (
          <button
            onClick={handleContinue}
            style={{
              display: "block",
              marginTop: "10px",
              padding: "4px 12px",
              fontSize: "0.9rem",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "gold",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Click to Continue...
          </button>
        )}
      </div>
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: `${star.y}%`,
              left: `${star.x}%`,
              color: "gold",
              fontSize: "20px",
            }}
          >
            ⭐
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TypingEffect;