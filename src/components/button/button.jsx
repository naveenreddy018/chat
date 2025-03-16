import React from 'react'
import { useNavigate } from 'react-router-dom'

function ButtonComponent() {
    const navigate = useNavigate()
  return (
    <div>
      <button
        className="back-arrow"
        onClick={() => navigate('/auth')}
        style={{
          cursor: 'pointer',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          padding: '10px',
          marginBottom: '10px',
          backgroundColor : "gray"
        }}
      >
        ← Back
      </button>

    </div>
  )
}

export default ButtonComponent
