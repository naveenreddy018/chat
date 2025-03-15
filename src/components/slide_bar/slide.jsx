import React, { useState, useEffect, useRef } from 'react';
import ImageComponent from '../ImageComponent/image.jsx';
import { assets } from '../../assets/assets';
import './slide.css';
import { useNavigate } from 'react-router-dom';
import { Array } from '../response_bar/response.jsx';

function Slide_Bar({ onPromptClick }) {
  const [menu, setMenu] = useState(false);
  const [history, setHistory] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.length > 0) {
      setHistory([...Array].reverse());
    }
  }, [Array]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const deletePrompt = (index) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter((_, i) => i !== index);
      Array.splice(Array.length - 1 - index, 1); // Remove from original Array
      return [...newHistory];
    });
  };

  const startRenaming = (index, prompt) => {
    setEditingIndex(index);
    setEditText(prompt);
  };

  const saveRenaming = (index) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory];
      updatedHistory[index] = editText;
      Array[Array.length - 1 - index] = editText; // Update in original Array
      return updatedHistory;
    });
    setEditingIndex(null);
  };

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
          <button className="close-btn" onClick={() => setMenu(false)}>✖</button>
        </div>

        <ul className="cont">
          <li className="history-title">
            <ImageComponent src={assets.history_icon} /> Recent History
          </li>
          {Array.length > 0 ? (
            Array.map((prompt, index) => (
              <li key={index} className="history-item">
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveRenaming(index)}
                    autoFocus
                  />
                ) : (
                  <span style={{fontSize : "1rem"}} onClick={() => onPromptClick(prompt)}> {prompt} </span>
                )}

                <button className="dots-btn" onClick={() => setMenuIndex(menuIndex === index ? null : index)}>⋮</button>

                {menuIndex === index && (
                  <div className="options-menu" ref={menuRef}>
                    <button onClick={() => setMenuIndex(null)} className="back-btn">🔙 Back</button>
                    <button onClick={() => startRenaming(index, prompt)}>Rename</button>
                    <button onClick={() => deletePrompt(index)} className="delete-btn">Delete</button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="history-empty">No recent prompts</li>
          )}
        </ul>

        <div className="bottom-section">
          <ul className="helpcontainer">
            <li onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
              <img
                style={{ borderRadius: '50%', fontWeight: '900' }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShoqKBIBUf2wQ8DJBoCYLC5TJhUtWf2esIsg&s"
                alt="About"
              />
              <span>About</span>
            </li>

            <li onClick={() => navigate('/help')} style={{ cursor: 'pointer' }}>
              <ImageComponent src={assets.question_icon} />
              <span>Help</span>
            </li>

            <li onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>
              <ImageComponent src={assets.setting_icon} />
              <span>Settings</span>
            </li>
          </ul>
        </div> 
      </div>
    </div>
  );
}

export default Slide_Bar;
