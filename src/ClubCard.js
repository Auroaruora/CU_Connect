import React from 'react';
import './styles.css'; // Your shared styles
import redHeartIcon from './assets/red Heart.png';
import xIcon from './assets/X 01.png';


function ClubCard({ name, description, events, image, onLike, onDislike }) {


  return (
    <div className="club-card">
      {/* Club Header */}
      <div className="club-header">
        <h2>{name}</h2>
      </div>

      {/* Club Body */}
      <div className="club-body">
        {/* Club Image */}
        <div className="club-image">
          <img
            src={image || '/assets/default-image.png'} // Fallback to a default image if missing
            alt={`${name}`}
            className="club-image-element"
          />
        </div>

        {/* Club Description */}
        <div className="club-content">
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Upcoming Events:</strong> {events !== "N/A" ? events : "No events scheduled"}
          </p>
        </div>
      </div>

      {/* Club Actions */}
      <div className="club-actions">
        <button className="action-btn dislike-btn" onClick={onDislike}>
          <img src={xIcon} alt="Dislike" />
        </button>
        <button className="action-btn like-btn" onClick={onLike}>
          <img src={redHeartIcon} alt="Like" />
        </button>
      </div>
    </div>
  );
}

export default ClubCard;
