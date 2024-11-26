import React from 'react';
import './App.css';

import trashIcon from './assets/icons8-trash-can-100.png';
import BPLSImage from './assets/4.png';
import ODTImage from './assets/1.png';
import SWEImage from './assets/2.png';
import CSImage from './assets/3.png';
import homeIcon from './assets/Heart.png';
import heartIcon from './assets/Home 2.png';
function LikedScreen() {
  return (
    <div className="app-container">
    <div className="liked-screen">
      <div className="content-container">
        <div className="liked-clubs">Liked Clubs</div>
        <div className="groups-container">
          <div className="group">
            <div className="rectangle"></div>
            <img className="trash-icon" src={trashIcon} alt="Trash Can Icon" />
            <div className="club-name">Black Pre-Law Society</div>
            <img className="screenshot" src={BPLSImage} alt="Screenshot 1" />
          </div>
          <div className="group">
            <div className="rectangle"></div>
            <img className="trash-icon" src={trashIcon} alt="Trash Can Icon" />
            <div className="club-name">Onyx Dance Troupe</div>
            <img className="screenshot" src={ODTImage} alt="Screenshot 2" />
          </div>
          <div className="group">
            <div className="rectangle"></div>
            <img className="trash-icon" src={trashIcon} alt="Trash Can Icon" />
            <div className="club-name" style={{ fontSize: '14px' }}>
              Society of Women Engineers
            </div>
            <img className="screenshot" src={SWEImage} alt="Screenshot 3" />
          </div>
          <div className="group">
            <div className="rectangle"></div>
            <img className="trash-icon" src={trashIcon} alt="Trash Can Icon" />
            <div className="club-name">Columbia Spectator</div>
            <img className="screenshot" src={CSImage} alt="Screenshot 4" />
          </div>
        </div>
      </div>
      <div className="bottom-navigation">
        <div className="nav-item">
          <img src={heartIcon} alt="Liked Icon" className="nav-icon" />
        </div>
        <div className="nav-item">
          <img src={homeIcon} alt="Home Icon" className="nav-icon" />
        </div>

      </div>
    </div>
  </div>
  );
}

export default LikedScreen;

function BlackPreLawSociety() {
  return (
    <div className="app-container">
      <div className="liked-screen">
        {/* Back to Home Button */}
        <div className="back-button">← Back to Home Page</div>

        {/* Title */}
        <div className="content-container">
          <h1 className="liked-clubs">Black Pre-Law Society</h1>

          {/* Image */}
          <div className="image-container">
            <img src={BPLSImage} alt="Group" className="group-image" />
          </div>

          {/* Description and Info */}
          <div className="info-container">
            <p className="description">
              <strong>Description:</strong> WiCS aims to support the advancement of womxn in computer science in academia and in industry.
            </p>
            <div className="events">
              <strong>Upcoming Events:</strong>
              <ul>
                <li>11/13: NSBE x WiCS Mixer</li>
                <li>11/14: Rilla Info Session</li>
                <li>11/16: Course Registration Hours</li>
              </ul>
            </div>
            <div className="social-links">
              <p>
                <strong>Instagram:</strong> columbiawics
              </p>
              <p>
                <strong>TikTok:</strong> columbiawics
              </p>
              <p>
                <strong>Website:</strong> cuwics.notion.site
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default BlackPreLawSociety;