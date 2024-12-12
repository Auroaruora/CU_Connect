// ClubDetails.js (New file)
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ClubDetails({ club }) {
  const { clubId } = useParams();

  return (
    <div className="club-details">
      <h2>{club.name}</h2>
      <img src={club.image} alt={club.name} />
      {/* Add more details here */}
      <p>Details for club ID: {clubId}</p>
    </div>
  );
}

export default ClubDetails;