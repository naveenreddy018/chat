import React, { useEffect, useState, useRef } from "react";

const TypingEffect = ({ text, delay = 30 }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const textContainerRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const userScrolledRef = useRef(false);

  useEffect(() => {
    if (!text || typingIntervalRef.current) return;

    let sanitizedText = text.replace(/\*/g, " ");
    sanitizedText = sanitizedText.replace(/(\d+\.|[-•])/g, "\n$1"); // Newline before numbers or bullet points

    let startIdx = index;
    let endIdx = Math.min(startIdx + 3500, sanitizedText.length);
    let truncatedText = sanitizedText.slice(startIdx, endIdx);

    let charIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      if (charIndex < truncatedText.length) {
        setDisplayText(sanitizedText.slice(0, startIdx + charIndex + 1)); // Fix skipping issue
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
        setShowButton(endIdx < sanitizedText.length);
      }
    }, Math.max(5, delay / 3));

    return () => {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    };
  }, [index, text, delay]);

  useEffect(() => {
    const handleScroll = () => {
      if (textContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = textContainerRef.current;
        userScrolledRef.current = scrollTop + clientHeight < scrollHeight - 20;
      }
    };

    if (textContainerRef.current) {
      textContainerRef.current.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (textContainerRef.current) {
        textContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);


  const handleContinue = () => {
    setIndex((prev) => prev + 3500);
    setShowButton(false);
  };

  return (
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
  );
};

export default TypingEffect;
