import React from 'react';
import './App.css';
import { useParams, Link } from 'react-router-dom';
import trashIcon from './assets/icons8-trash-can-100.png';
import homeIcon from './assets/Heart.png';
import heartIcon from './assets/Home 2.png';
import { useNavigate } from 'react-router-dom';

function HomeScreen({likedClubs }) {

  const navigate = useNavigate();

  const handleLikeClick = () => {
    navigate(`/Likedclubs`); 
  };
  return (
      <div className="liked-screen">
        <div className="content-container">
          <div className="liked-clubs">Home Screen </div>
          <div className="groups-container">
            Place holder of the homeScreen 
          </div>
        </div>

        <div className="bottom-navigation">
          <div className="nav-item">
            <img src={heartIcon} alt="Liked Icon" className="nav-icon"/>
          </div>
          <div className="nav-item">
            <img src={homeIcon} alt="Home Icon" className="nav-icon" onClick={() => handleLikeClick()} />
          </div>
        </div>
      </div>
  );
}

export default HomeScreen;