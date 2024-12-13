import React, { useState, useEffect } from "react";
import ClubCard from "./ClubCard";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

function HomeScreen({
  clubsData,
  likedClubs,
  setLikedClubs,
  viewedClubs,
  setViewedClubs,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backendLikedClubs, setBackendLikedClubs] = useState([]);
  const [direction, setDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

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
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("right");

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

    setTimeout(() => {
      moveToNextCard();
      setDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleDislike = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("left");

    const currentClub = filteredClubs[currentIndex];
    setViewedClubs([...viewedClubs, currentClub]);

    setTimeout(() => {
      moveToNextCard();
      setDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const moveToNextCard = () => {
    if (currentIndex < filteredClubs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("No more clubs to display.");
    }
  };

  const navigate = useNavigate();

  const getCardStyle = () => {
    if (!direction) return {};

    const transform =
      direction === "right"
        ? "translateX(120%) rotate(20deg)"
        : "translateX(-120%) rotate(-20deg)";

    return {
      transform,
      transition: "transform 0.3s ease-out",
    };
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Outfit']"
      style={{
        background:
          "linear-gradient(135deg, #75B2DD 0%, #9CC7E5 50%, #EFF6FB 100%)",
      }}
    >
      {/* Increased top spacer */}
      <div className="flex-[1.2]" />

      {/* Header */}
      <div className="px-8 mb-8">
        <h1 className="text-[#002B7F] text-4xl font-bold text-center tracking-tight">
          Campus Connect
        </h1>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col items-center px-4"
        style={{ marginBottom: "60px" }}
      >
        {currentIndex < filteredClubs.length ? (
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              position: "relative",
              ...getCardStyle(),
            }}
          >
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
          </div>
        ) : (
          <div className="w-full max-w-[400px]">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg py-6 px-8">
              <p className="text-[#4A5568] text-xl text-center font-medium">
                No more clubs to display!
              </p>
              <p className="text-gray-500 text-center mt-2">
                Check out your liked clubs to see your matches
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="flex-1" />

      {/* Navigation Bar */}
      <NavigationBar className="mt-auto" />
    </div>
  );
}

export default HomeScreen;
