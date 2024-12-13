import React, { useState, useEffect } from "react";
import ClubCard from './ClubCard';
import heartIcon from './assets/Heart.png';
import homeIcon from './assets/Home 2.png';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';


function HomeScreen({ clubsData, likedClubs, setLikedClubs, viewedClubs, setViewedClubs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backendLikedClubs, setBackendLikedClubs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/liked-clubs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch liked clubs from backend");
        }
        return response.json();
      })
      .then((data) => {
        setBackendLikedClubs(data);
      })
      .catch((error) => {
        console.error("Error fetching liked clubs from backend:", error);
      });
  }, []);

  const filteredClubs = clubsData.filter(
    (club) =>
      !viewedClubs.find((viewedClub) => viewedClub.id === club.id) &&
      !backendLikedClubs.find((likedClub) => likedClub.id === club.id)
  );

  const handleLike = () => {
    const currentClub = filteredClubs[currentIndex];

    console.log("Current club being liked:", currentClub);

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
        setBackendLikedClubs(data.liked_clubs);
      })
      .catch((error) => {
        console.error("Error adding liked club to backend:", error);
      });

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
    <div className="min-h-screen bg-blue-50">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-navy-900 text-center">Campus Connect</h1>
      </div>

      <div className="px-4 pb-20">
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
          <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
            <p className="text-gray-600">No more clubs to display!</p>
          </div>
        )}
      </div>

      <NavigationBar />
    </div>
  );
}

export default HomeScreen;