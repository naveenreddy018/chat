import React, { useEffect, useState } from "react";

const TypingEffect = ({ text, delay, query}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    let intervalid;

    if (text) {
      intervalid = setInterval(() => {

        while (text[index] === "*" && index < text.length) {
          index += 1;
        }


        if (index < text.length) {
          setDisplayText((prev) => prev + text[index]);
          index += 1;
        } else {
          clearInterval(intervalid);
        }
      }, delay);
    }

    return () => clearInterval(intervalid);
  }, [text, delay]);

  return (

    <div style={{color : "black",fontSize : "1.1rem"}} >{displayText.replaceAll("*"," ")}</div>

  );
};

export default TypingEffect;
