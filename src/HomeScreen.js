import React, { useState } from "react";
import ClubCard from './ClubCard';
import heartIcon from './assets/Heart.png'; // Navigation bar icons
import homeIcon from './assets/Home 2.png';
import { useNavigate } from 'react-router-dom';

function HomeScreen({ clubsData, likedClubs, setLikedClubs }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    const currentClub = clubsData[currentIndex];
    if (!likedClubs.find((club) => club.id === currentClub.id)) {
      setLikedClubs([...likedClubs, currentClub]); // Add to liked clubs
    }
    moveToNextCard();
  };

  const handleDislike = () => {
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (currentIndex < clubsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("No more clubs to display.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="app">
      <h1 className="page-title">Campus Connect</h1>
      <div className="club-card">
        {currentIndex < clubsData.length ? (
          <ClubCard
            name={clubsData[currentIndex].name}
            description={clubsData[currentIndex].description}
            events={clubsData[currentIndex].events}
            image={clubsData[currentIndex].image}
            instagram={clubsData[currentIndex].instagram}
            website={clubsData[currentIndex].website}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ) : (
          <p>No more clubs to display!</p>
        )}
      </div>
      <div className="bottom-navigation">
        <div className="nav-item">
          <img src={homeIcon} alt="Home Icon" className="nav-icon" />
        </div>
        <div className="nav-item">
          <img src={heartIcon} alt="Like Icon" className="nav-icon" onClick={() => navigate("/likedclubs")} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
