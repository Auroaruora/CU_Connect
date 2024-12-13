import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

function ClubDetails() {
  const { clubId } = useParams(); // Extract `clubId` from the URL
  const navigate = useNavigate();
  const [club, setClub] = useState(null); // State to hold club data

  useEffect(() => {
    // Fetch the specific club's details from the backend
    fetch(`http://127.0.0.1:5000/liked-clubs/${clubId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch club details from the backend");
        }
        return response.json();
      })
      .then((data) => {
        setClub(data); // Set the fetched club details in state
      })
      .catch((error) => {
        console.error("Error fetching club details:", error);
      });
  }, [clubId]);

  const handleBackClick = () => {
    navigate(`/likedclubs`); // Navigate back to the Liked Clubs screen
  };

  if (!club) {
    return <div className="loading">Loading club details...</div>; // Loading state
  }

  return (
    <div className="club-details">
      <div className="content-container">
        <h1 className="club-name">{club.name}</h1> {/* Club name */}
        <img src={club.image || '/assets/default-image.png'} alt={club.name} className="club-image" />
        <p className="club-description">
          <strong>Description:</strong> {club.description}
        </p>
        <p className="club-events">
          <strong>Events:</strong> {club.events !== "N/A" ? club.events : "No events available"}
        </p>
        <button onClick={handleBackClick} className="back-button">
          Back to Liked Clubs
        </button> {/* Back button */}
      </div>
    </div>
  );
}

export default ClubDetails;
