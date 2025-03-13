import React, { useState } from 'react';
import ImageComponent from '../ImageComponent/image.jsx';
import { assets } from '../../assets/assets';
import './slide.css';
import { Link } from 'react-router-dom';

function Slide_Bar() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="slide_container">
      {/* Hamburger Button */}
      {
        !menu && <button className="hamburger" onClick={() => setMenu(prev => !prev)}>
        ☰
      </button>
      }

      {/* Sidebar */}
      <div className={`sidebar ${menu ? 'show' : ''}`}>
        <div className="top-section">
          <h3>Menu</h3>
          <button className="close-btn" onClick={() => setMenu(false)}>✖</button>
        </div>

        <ul>
          <li><ImageComponent src={assets.history_icon} /> Recent History</li>
          <li><ImageComponent src={assets.question_icon} /> <Link to="/help">Help</Link></li>
          <li><ImageComponent src={assets.setting_icon} /> <Link to="/settings">Settings</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Slide_Bar;
