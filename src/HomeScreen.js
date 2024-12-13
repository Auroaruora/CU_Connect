import React, { useState, useEffect } from "react";
import ClubCard from './ClubCard';
import heartIcon from './assets/Heart.png'; // Navigation bar icons
import homeIcon from './assets/Home 2.png';
import { useNavigate } from 'react-router-dom';

function HomeScreen({ clubsData, likedClubs, setLikedClubs, viewedClubs, setViewedClubs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backendLikedClubs, setBackendLikedClubs] = useState([]); // New state for backend liked clubs

  useEffect(() => {
    // Fetch liked clubs from backend on component mount
    fetch("http://127.0.0.1:5000/liked-clubs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch liked clubs from backend");
        }
        return response.json();
      })
      .then((data) => {
        setBackendLikedClubs(data); // Update the backend liked clubs state
      })
      .catch((error) => {
        console.error("Error fetching liked clubs from backend:", error);
      });
  }, []);

  // Filter clubs to exclude those in the backend liked list or already viewed
  const filteredClubs = clubsData.filter(
    (club) =>
      !viewedClubs.find((viewedClub) => viewedClub.id === club.id) &&
      !backendLikedClubs.find((likedClub) => likedClub.id === club.id)
  );

  const handleLike = () => {
    const currentClub = filteredClubs[currentIndex]; // Use filteredClubs

    console.log("Current club being liked:", currentClub);

    // Send the liked club to the backend
    fetch("http://127.0.0.1:5000/liked-clubs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentClub),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add liked club to backend");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Club successfully added to backend:", data.liked_clubs);
        setBackendLikedClubs(data.liked_clubs); // Update local backend liked state
      })
      .catch((error) => {
        console.error("Error adding liked club to backend:", error);
      });

    // Add to frontend liked list and move to next card
    if (!likedClubs.find((club) => club.id === currentClub.id)) {
      setLikedClubs([...likedClubs, currentClub]);
    }
    setViewedClubs([...viewedClubs, currentClub]);
    moveToNextCard();
  };

  const handleDislike = () => {
    const currentClub = filteredClubs[currentIndex];
    setViewedClubs([...viewedClubs, currentClub]);
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (currentIndex < filteredClubs.length - 1) {
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
        {currentIndex < filteredClubs.length ? (
          <ClubCard
            name={filteredClubs[currentIndex].name}
            description={filteredClubs[currentIndex].description}
            events={filteredClubs[currentIndex].events}
            image={filteredClubs[currentIndex].image}
            instagram={filteredClubs[currentIndex].instagram}
            website={filteredClubs[currentIndex].website}
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
