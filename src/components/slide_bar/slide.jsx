import React, { useState } from 'react';
import ImageComponent from '../ImageComponent/image.jsx';
import { assets } from '../../assets/assets';
import './slide.css';
import { Link } from 'react-router-dom';
import { Array } from '../response_bar/response.jsx';

function Slide_Bar({ onPromptClick }) {
  const [menu, setMenu] = useState(false);

  return (
    <div className="slide_container">
      {!menu && (
        <button className="hamburger" onClick={() => setMenu((prev) => !prev)}>
          ☰
        </button>
      )}

      <div className={`sidebar ${menu ? 'show' : ''}`}>
        <div className="top-section">
          <h3>Menu</h3>
          <button className="close-btn" onClick={() => setMenu(false)}>
            ✖
          </button>
        </div>

    
        <ul className="cont">
          <li className="history-title">
            <ImageComponent src={assets.history_icon} /> Recent History
          </li>
          {Array.length > 0 ? (
            Array.slice().reverse().map((prompt, index) => (
              <li key={index} className="history-item" onClick={() => onPromptClick(prompt)}>
                {prompt}
              </li>
            ))
          ) : (
            <li className="history-empty">No recent prompts</li>
          )}
        </ul>


        <div className="bottom-section">
          <ul className="helpcontainer">
            <li>
              <img style={{ borderRadius: "50%", fontWeight: "900" }} 
                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShoqKBIBUf2wQ8DJBoCYLC5TJhUtWf2esIsg&s" 
                   alt="About" />
              <Link to="/about">About</Link>
            </li>
            <li>
              <ImageComponent src={assets.question_icon} />
              <Link to="/help">Help</Link>
            </li>
            <li>
              <ImageComponent src={assets.setting_icon} />
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Slide_Bar;
