import React from 'react';
import './App.css';
import { useParams, Link } from 'react-router-dom';
import trashIcon from './assets/icons8-trash-can-100.png';
import homeIcon from './assets/Heart.png';
import heartIcon from './assets/Home 2.png';
import { useNavigate } from 'react-router-dom';

function LikedScreen({likedClubs }) {

  const navigate = useNavigate();

  const handleClubClick = (clubId) => {
    navigate(`/club/${clubId}`); 
  };
  return (
      <div className="liked-screen">
        <div className="content-container">
          <div className="liked-clubs">Liked Clubs</div>
          <div className="groups-container">
            {likedClubs.map((club) => (
              <div className="group" key={club.id} onClick={() => handleClubClick(club.id)}>
                <div className="rectangle"></div>
                <img className="trash-icon" src={trashIcon} alt="Trash Can Icon" />
                <div className="club-name" style={club.name.length > 25 ? { fontSize: '14px' } : {}}>
                  {club.name}
                </div>
                <img className="screenshot" src={require(`${club.image}`)} alt={club.name} />
              </div>
            ))}
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
  );
}

export default LikedScreen;