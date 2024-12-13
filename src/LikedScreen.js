import React, { useState, useEffect } from "react";
import "./App.css";
import trashIcon from "./assets/icons8-trash-can-100.png";
import { useNavigate } from "react-router-dom";
import NavigationBar from './NavigationBar';

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

function LikedScreen({ likedClubs, setLikeClub }) {
  const navigate = useNavigate();

  // 🕵️‍♂️ **Fetch liked clubs from backend on load**
  useEffect(() => {
    fetch("http://127.0.0.1:5000/liked-clubs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch liked clubs from backend");
        }
        return response.json();
      })
      .then((data) => {
        setLikeClub(data);
        console.log('Fetched liked clubs from backend:', data);
      })
      .catch((error) => {
        console.error("Error fetching liked clubs from backend:", error);
      });
  }, [setLikeClub]);

  // 🛠️ **Delete a club from liked list**
  const onDeleteClub = (clubId) => {
    console.log('Attempting to delete club with id:', clubId);
    
    fetch(`http://127.0.0.1:5000/liked-clubs/${clubId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete club with id: ${clubId}`);
        }
        return response.json().catch(() => ({ success: true })); 
      })
      .then(() => {
        console.log('Successfully deleted club from backend.');
        // Update the local state to remove the deleted club
        setLikeClub((prevClubs) => prevClubs.filter((club) => club.id !== clubId));
      })
      .catch((error) => {
        console.error("Error deleting club from backend:", error);
      });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Liked Clubs</h1>

        {likedClubs.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            Nothing added yet. Go explore new clubs!
          </div>
        ) : (
          <div className="space-y-3">
            {likedClubs.map((club) => {
              const displayImage = imageMap[club.image] || noLogo;
              
              return (
                <div 
                  key={club.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div 
                      className="w-12 h-12 flex-shrink-0"
                      onClick={() => navigate(`/likedclubs/${club.id}`)}
                    >
                      <img
                        src={displayImage}
                        alt={club.name}
                        className="w-full h-full object-contain rounded"
                        onError={(e) => {
                          e.target.src = noLogo;
                        }}
                      />
                    </div>
                    <div 
                      className="flex-grow px-4 cursor-pointer"
                      onClick={() => navigate(`/likedclubs/${club.id}`)}
                    >
                      <h3 className={`font-medium ${club.name.length > 25 ? 'text-sm' : 'text-base'}`}>
                        {club.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => onDeleteClub(club.id)}
                      className="w-8 h-8 flex items-center justify-center"
                    >
                      <img
                        src={trashIcon}
                        alt="Delete"
                        className="w-6 h-6 opacity-60 hover:opacity-100"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fixed bottom navigation */}
      <NavigationBar />
    </div>
  );
}

export default LikedScreen;
