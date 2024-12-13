import React, { useState, useEffect } from "react";
import "./App.css";
import trashIcon from "./assets/icons8-trash-can-100.png";
import homeIcon from "./assets/Heart.png";
import heartIcon from "./assets/Home 2.png";
import { useNavigate } from "react-router-dom";

function LikedScreen({ likedClubs, setLikeClub }) {
  useEffect(() => {
    // Fetch liked clubs from backend
    fetch("http://127.0.0.1:5000/liked-clubs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch liked clubs from backend");
        }
        return response.json();
      })
      .then((data) => {
        setLikeClub(data); // Update liked clubs state
      })
      .catch((error) => {
        console.error("Error fetching liked clubs from backend:", error);
      });
  }, [setLikeClub]);

  const navigate = useNavigate();

  // Handle deleting a club
  const onDeleteClub = (clubId) => {
    fetch(`http://127.0.0.1:5000/liked-clubs/${clubId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete club from backend");
        }
        return response.json();
      })
      .then(() => {
        // Update the state after successful deletion
        setLikeClub((prevClubs) => prevClubs.filter((club) => club.id !== clubId));
      })
      .catch((error) => {
        console.error("Error deleting club from backend:", error);
      });
  };

  const handleClubClick = (clubId) => {
    navigate(`/likedclubs/${clubId}`); // Navigate to the ClubCard view
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
                <img
                  className="screenshot"
                  src={club.image} // Ensure `club.image` is a valid path or URL
                  alt={club.name}
                  onClick={() => navigate(`/likedclubs/${club.id}`)} // Navigate to ClubCard on click
                />
                <div
                  className="club-name"
                  style={club.name.length > 25 ? { fontSize: "14px" } : {}}
                  onClick={() => navigate(`/likedclubs/${club.id}`)} // Navigate to ClubCard on click
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
          <img
            src={heartIcon}
            alt="Liked Icon"
            className="nav-icon"
            onClick={() => handleHomeClick()}
          />
        </div>
        <div className="nav-item">
          <img src={homeIcon} alt="Home Icon" className="nav-icon" />
        </div>
      </div>
    </div>
  );

}

export default LikedScreen;
