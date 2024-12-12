import React from 'react';
import './App.css';
import { useParams, Link } from 'react-router-dom';
import trashIcon from './assets/icons8-trash-can-100.png';
import homeIcon from './assets/Heart.png';
import heartIcon from './assets/Home 2.png';
import { useNavigate } from 'react-router-dom';

function LikedScreen({likedClubs, setLikeClub }) {

  const navigate = useNavigate();

  const onDeleteClub = (clubId) => {
    setLikeClub((prevClubs) => prevClubs.filter((club) => club.id !== clubId)); // Use the setter to remove the club
  };

  const handleClubClick = (clubId) => {
    navigate(`/Likedclubs/${clubId}`); 
  };
  const handleHomeClick = () => {
    navigate(`/home`); 
  };

  return (
      <div className="liked-screen">
        <div className="content-container">
          <div className="liked-clubs">Liked Clubs</div>
          {likedClubs.length === 0 ? (
            <div className="no-clubs-message">Go explore new clubs!</div>
          ) : (
            <div className="groups-container">
              {likedClubs.map((club) => (
                <div className="group" key={club.id}>
                  <div className="rectangle"></div>
                  <img className="screenshot" src={require(`${club.image}`)} alt={club.name} />
                  <div
                    className="club-name"
                    style={club.name.length > 25 ? { fontSize: '14px' } : {}}
                    onClick={() => handleClubClick(club.id)}
                  >
                    {club.name}
                  </div>
                  <img
                    className="trash-icon"
                    src={trashIcon}
                    alt="Trash Can Icon"
                    onClick={() => onDeleteClub(club.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bottom-navigation">
          <div className="nav-item">
            <img src={heartIcon} alt="Liked Icon" className="nav-icon" onClick={() => handleHomeClick()}/>
          </div>
          <div className="nav-item">
            <img src={homeIcon} alt="Home Icon" className="nav-icon" />
          </div>
        </div>
      </div>
  );
}

export default LikedScreen;
