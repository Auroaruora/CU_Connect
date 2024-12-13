import React from 'react';
import './styles.css';
import redHeartIcon from './assets/red Heart.png';
import xIcon from './assets/X 01.png';
import adiLogo from './assets/ADI.png';
import bwogLogo from './assets/Bwog.png';
import ccgLogo from './assets/CCG.png';
import ceaLogo from './assets/CEA.png';
import cfgLogo from './assets/CFG.png';
import clefLogo from './assets/CLEF.png';
import cwbsLogo from './assets/CWBS.png';
import noLogo from './assets/NoLogo.png';
import nonseqLogo from './assets/Nonseq.png';
import onyxLogo from './assets/ONYX.png';
import vsLogo from './assets/VS.png';
import wkcrLogo from './assets/WKCR.png';

const imageMap = {
  './assets/ADI.png': adiLogo,
  './assets/Bwog.png': bwogLogo,
  './assets/CCG.png': ccgLogo,
  './assets/CEA.png': ceaLogo,
  './assets/CFG.png': cfgLogo,
  './assets/CLEF.png': clefLogo,
  './assets/CWBS.png': cwbsLogo,
  './assets/NoLogo.png': noLogo,
  './assets/Nonseq.png': nonseqLogo,
  './assets/ONYX.png': onyxLogo,
  './assets/VS.png': vsLogo,
  './assets/WKCR.png': wkcrLogo
};

function ClubCard({ name, description, events, image, onLike, onDislike }) {
  const displayImage = imageMap[image] || noLogo;

  return (
    <div style={{
      width: '90%',
      minWidth: '320px',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '75vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Club Header */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#F0F4F8',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '20px',
          textAlign: 'center',
          fontWeight: '600',
          color: '#1A365D'
        }}>{name}</h2>
      </div>

      {/* Main Content Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 24px'
      }}>
        {/* Image Container */}
        <div style={{
          width: '100%',
          height: '180px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={displayImage}
            alt={name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            onError={(e) => {
              e.target.src = noLogo;
            }}
          />
        </div>

        {/* Text Content */}
        <div style={{
          flex: 1,
          minHeight: '150px' // Ensures minimum space for content
        }}>
          <div style={{
            marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#2D3748',
              marginBottom: '8px'
            }}>Description:</div>
            <p style={{
              margin: 0,
              lineHeight: '1.5',
              color: '#4A5568'
            }}>{description}</p>
          </div>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#2D3748',
              marginBottom: '8px'
            }}>Upcoming Events:</div>
            <p style={{
              margin: 0,
              lineHeight: '1.5',
              color: '#4A5568'
            }}>{events !== "N/A" ? events : "No events scheduled"}</p>
          </div>
        </div>

        {/* Spacer to push buttons to bottom */}
        <div style={{ flex: 1, minHeight: '20px' }} />
      </div>

      {/* Action Buttons */}
      <div style={{
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)'
      }}>
        <button 
          onClick={onDislike}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '2px solid #E2E8F0',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '10px'
          }}
        >
          <img src={xIcon} alt="Dislike" style={{ width: '100%', height: '100%' }} />
        </button>
        <button 
          onClick={onLike}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '2px solid #FED7E2',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '10px'
          }}
        >
          <img src={redHeartIcon} alt="Like" style={{ width: '100%', height: '100%' }} />
        </button>
      </div>
    </div>
  );
}

export default ClubCard;