import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

function ClubDetails() {
  const { clubId } = useParams(); // Get the clubId from the URL
  const navigate = useNavigate();
  const [club, setClub] = useState(null); // State to hold the selected club's data

  useEffect(() => {
    // Fetch the club data from clubs.json
    fetch("/clubs.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch clubs.json");
        }
        return response.json();
      })
      .then((data) => {
        const foundClub = data.find((c) => c.id === parseInt(clubId));
        setClub(foundClub);
      })
      .catch((error) => {
        console.error("Error fetching the club data:", error);
      });
  }, [clubId]);

  const handleBackClick = () => {
    navigate("/likedclubs"); // Navigate back to the Liked Clubs page
  };

  if (!club) {
    return <div className="loading">Loading club details...</div>; // Loading state
  }

  return (
    <div className="liked-screen">
      <div
        className="content-container"
        style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
      >
        <div
          className="liked-clubs"
          style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}
        >
          {club.name}
        </div>
        <div className="groups-container">
          <button onClick={handleBackClick} style={{ display: "block", margin: "10px auto" }}>
            Back to Liked Clubs
          </button>
          <div className="club-details">
            <img
              className="club-image"
              src={club.image || "/assets/default-image.png"}
              alt={club.name}
              style={{ display: "block", margin: "10px auto" }}
            />
            <p><strong>Description:</strong> {club.description}</p>
            <p><strong>Events:</strong> {club.events || "No events available."}</p>
            <p>
              {club.instagram !== "N/A" ? (
                <a href={club.instagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                  Instagram
                </a>
              ) : (
                <span>Instagram: Not available</span>
              )}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              {club.website !== "N/A" ? (
                <a href={club.website} target="_blank" rel="noopener noreferrer">
                  {club.website}
                </a>
              ) : (
                "Not available"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;


