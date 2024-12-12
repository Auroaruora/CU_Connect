// ClubDetails.js (New file)
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function ClubDetails({ club }) {
  const { clubId } = useParams();

  const navigate = useNavigate();

  const handlebackClick = () => {
    navigate(`/Likedclubs`); 
  };

  return (
    <div className="liked-screen">
    <div className="content-container">
      <div className="liked-clubs">Details page </div>
      <div className="groups-container">
        <button onClick={() => handlebackClick()}>Back to Liked Clubs</button> {/* Back button */}
        Place holder of the Details page
      </div>
    </div>
    </div>

  );
}

export default ClubDetails;