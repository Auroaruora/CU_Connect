import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

// Import all club images
import adiLogo from './assets/ADI.png';
import bwogLogo from './assets/Bwog.png';
import ccgLogo from './assets/CCG.png';
import ceaLogo from './assets/CEA.png';
import cfgLogo from './assets/CFG.png';
import clefLogo from './assets/CLEF.png';
import cwbsLogo from './assets/CWBS.png';
import noLogo from './assets/NoLogo.png';
import nonseqLogo from './assets/Nonseq.png';
import onyxLogo from './assets/ONYX.png';
import vsLogo from './assets/VS.png';
import wkcrLogo from './assets/WKCR.png';

const imageMap = {
  './assets/ADI.png': adiLogo,
  './assets/Bwog.png': bwogLogo,
  './assets/CCG.png': ccgLogo,
  './assets/CEA.png': ceaLogo,
  './assets/CFG.png': cfgLogo,
  './assets/CLEF.png': clefLogo,
  './assets/CWBS.png': cwbsLogo,
  './assets/NoLogo.png': noLogo,
  './assets/Nonseq.png': nonseqLogo,
  './assets/ONYX.png': onyxLogo,
  './assets/VS.png': vsLogo,
  './assets/WKCR.png': wkcrLogo
};

function ClubDetails() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);

  useEffect(() => {
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

  if (!club) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading club details...</div>
      </div>
    );
  }

  const displayImage = imageMap[club.image] || noLogo;

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Club Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-center">{club.name}</h1>
          {club.nickname && (
            <p className="text-center text-gray-600 mt-1">({club.nickname})</p>
          )}
        </div>

        <div className="p-6">
          {/* Back Button */}
          <button 
            onClick={() => navigate("/likedclubs")}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Liked Clubs
          </button>

          {/* Club Image */}
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-6">
            <img
              src={displayImage}
              alt={club.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = noLogo;
                console.log(`Failed to load image for ${club.name}, using NoLogo instead`);
              }}
            />
          </div>

          {/* Club Information */}
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-gray-900">Description</h2>
              <p className="text-gray-600 mt-1">{club.description}</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">Events</h2>
              <p className="text-gray-600 mt-1">
                {club.events !== "N/A" ? club.events : "No events scheduled"}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-2 pt-4">
              {club.instagram !== "N/A" && (
                <a
                  href={club.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Instagram →
                </a>
              )}
              
              {club.website !== "N/A" && (
                <a
                  href={club.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Website →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;