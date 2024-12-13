import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHomePage = location.pathname === '/home';
  const isLikedPage = location.pathname === '/likedclubs';

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: 'white',
      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 20px',
      zIndex: 10 // Ensure nav bar stays on top
    }}>
      {/* Home Icon */}
      <button
        onClick={() => navigate('/home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isHomePage ? "#000000" : "#CCCCCC"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </button>

      {/* Heart Icon */}
      <button
        onClick={() => navigate('/likedclubs')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={isLikedPage ? "#000000" : "none"}
          stroke={isLikedPage ? "#000000" : "#CCCCCC"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );
}

export default NavigationBar;