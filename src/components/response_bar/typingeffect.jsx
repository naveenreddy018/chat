import React, { useEffect, useState, useRef } from "react";

const TypingEffect = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const textContainerRef = useRef(null); 

  useEffect(() => {
    if (!text) return;

    let sanitizedText = text.replace(/\*/g, " "); 
    let startIdx = index;
    let endIdx = Math.min(startIdx + 700, sanitizedText.length); 
    let truncatedText = sanitizedText.slice(startIdx, endIdx);

    let charIndex = 0;
    let intervalid = setInterval(() => {
      if (charIndex < truncatedText.length) {
        setDisplayText((prev) => prev + truncatedText[charIndex]);
        charIndex += 1;
      } else {
        clearInterval(intervalid);
        setShowButton(endIdx < sanitizedText.length);


        setTimeout(() => {
          if (textContainerRef.current) {
            textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
          }
        }, 100);
      }
    }, delay);

    return () => clearInterval(intervalid);
  }, [index, text, delay]);

  const handleContinue = () => {
    setIndex((prev) => prev + 500); 
    setShowButton(false); 
  };

  return (
    <div
      ref={textContainerRef}
      style={{
        color: "black",
        fontSize: "1.1rem",
        maxHeight: "300px", 
        overflowY: "auto",
        padding: "10px",
        // border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {displayText}
      {showButton && (
        <button
          onClick={handleContinue}
          style={{
            display: "block",
            marginTop: "10px",
            padding: "4px 12px",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color:"gold",
            border: "none",
            borderRadius: "5px",
          }}
        >
         click to  Continue.........
        </button>
      )}
    </div>
  );
};

export default TypingEffect;
