import React, { useState } from 'react';
import ClubCard from './ClubCard';
import clubs from './clubs.json'; // Import the JSON data
import heartIcon from './assets/Heart.png'; // Navigation bar icons
import homeIcon from './assets/Home 2.png';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';



function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card

  // Handle "like" action
  const handleLike = () => {
    console.log(`Liked: ${clubs[currentIndex].name}`);
    moveToNextCard();
  };

  // Handle "dislike" action
  const handleDislike = () => {
    console.log(`Disliked: ${clubs[currentIndex].name}`);
    moveToNextCard();
  };

  // Move to the next card
  const moveToNextCard = () => {
    if (currentIndex < clubs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('No more cards to display.');
    }
  };

  const navigate = useNavigate();

  const handleLikeClick = () => {
    navigate(`/Likedclubs`); 
  };


  return (
    <div className="app">
      <h1 className="page-title">Campus Connect</h1>
      
      <div className="club-card">
        {currentIndex < clubs.length ? (
          <ClubCard
            name={clubs[currentIndex].name}
            description={clubs[currentIndex].description}
            events={clubs[currentIndex].events}
            image={clubs[currentIndex].image}
            instagram={clubs[currentIndex].instagram}
            website={clubs[currentIndex].website}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ) : (
          <p>No more clubs to display!</p>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-navigation">
          <div className="nav-item">
            <img src={homeIcon} alt="Home Icon" className="nav-icon"/>
          </div>
          <div className="nav-item">
            <img src={heartIcon} alt="Like Icon" className="nav-icon" onClick={() => handleLikeClick()} />
          </div>
        </div>
      </div>
  );
}

export default HomeScreen;
