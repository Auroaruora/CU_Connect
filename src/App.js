import React from 'react';
import './App.css';

import Icons8TrashCan1001Image from './assets/icons8-trash-can-100.png';
import BPLSImage from './assets/4.png';
import ODTImage from './assets/1.png';
import SWEImage from './assets/2.png';
import CSImage from './assets/3.png';

function LikedScreen() {
  return (
    <div className="app-container">
      <div className="liked-screen">
          <div className="content-container">
              <div className="liked-clubs">Liked Clubs</div>
              <div className="groups-container">
                  <div className="group">
                      <div className="rectangle"></div>
                      <img className="trash-icon" src={Icons8TrashCan1001Image} alt="Trash Can Icon" />
                      <div className="club-name">Black Pre-Law Society</div>
                      <img className="screenshot" src={BPLSImage} alt="Screenshot 1" />
                  </div>
                  <div className="group">
                      <div className="rectangle"></div>
                      <img className="trash-icon" src={Icons8TrashCan1001Image} alt="Trash Can Icon" />
                      <div className="club-name">Onyx Dance Troupe</div>
                      <img className="screenshot" src={ODTImage} alt="Screenshot 2" />
                  </div>
                  <div className="group">
                      <div className="rectangle"></div>
                      <img className="trash-icon" src={Icons8TrashCan1001Image} alt="Trash Can Icon" />
                      <div className="club-name"style={{ fontSize: '14px' }}>Society of Women Engineers</div>
                      <img className="screenshot" src={SWEImage} alt="Screenshot 3" />
                  </div>
                  <div className="group">
                      <div className="rectangle"></div>
                      <img className="trash-icon" src={Icons8TrashCan1001Image} alt="Trash Can Icon" />
                      <div className="club-name">Columbia Spectator</div>
                      <img className="screenshot" src={CSImage} alt="Screenshot 4" />
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}



export default LikedScreen;
