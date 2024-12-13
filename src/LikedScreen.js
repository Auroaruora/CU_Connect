import React, { useState, useEffect } from "react";
import "./App.css";
import trashIcon from "./assets/icons8-trash-can-100.png";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

// Import all club images
import adiLogo from "./assets/ADI.png";
import bwogLogo from "./assets/Bwog.png";
import ccgLogo from "./assets/CCG.png";
import ceaLogo from "./assets/CEA.png";
import cfgLogo from "./assets/CFG.png";
import clefLogo from "./assets/CLEF.png";
import cwbsLogo from "./assets/CWBS.png";
import noLogo from "./assets/NoLogo.png";
import nonseqLogo from "./assets/Nonseq.png";
import onyxLogo from "./assets/ONYX.png";
import vsLogo from "./assets/VS.png";
import wkcrLogo from "./assets/WKCR.png";

const imageMap = {
  "./assets/ADI.png": adiLogo,
  "./assets/Bwog.png": bwogLogo,
  "./assets/CCG.png": ccgLogo,
  "./assets/CEA.png": ceaLogo,
  "./assets/CFG.png": cfgLogo,
  "./assets/CLEF.png": clefLogo,
  "./assets/CWBS.png": cwbsLogo,
  "./assets/NoLogo.png": noLogo,
  "./assets/Nonseq.png": nonseqLogo,
  "./assets/ONYX.png": onyxLogo,
  "./assets/VS.png": vsLogo,
  "./assets/WKCR.png": wkcrLogo,
};

function LikedScreen({ likedClubs, setLikeClub }) {
  const navigate = useNavigate();

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
        console.log("Fetched liked clubs from backend:", data);
      })
      .catch((error) => {
        console.error("Error fetching liked clubs from backend:", error);
      });
  }, [setLikeClub]);

  const onDeleteClub = (clubId) => {
    console.log("Attempting to delete club with id:", clubId);

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
        console.log("Successfully deleted club from backend.");
        setLikeClub((prevClubs) =>
          prevClubs.filter((club) => club.id !== clubId)
        );
      })
      .catch((error) => {
        console.error("Error deleting club from backend:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col font-['Outfit'] relative overflow-hidden">
      {/* Vibrant Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: "#75AADB",
          backgroundImage: `
            radial-gradient(circle at 100% 0%, #9CC7E5 0%, transparent 45%),
            radial-gradient(circle at 0% 100%, #9CC7E5 0%, transparent 45%),
            linear-gradient(135deg, rgba(19, 60, 139, 0.1) 0%, rgba(255, 255, 255, 0.15) 100%)
          `,
        }}
      >
        {/* Light Accents */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 35%),
              radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 35%)
            `,
            opacity: 0.8,
          }}
        />
      </div>

      {/* Adjusted Header - now using padding instead of fixed positioning */}
      <div className="z-10 pt-12 pb-6 px-8 bg-transparent">
        <h1 className="text-[#002B7F] text-4xl font-bold text-center tracking-tight">
          Liked Clubs
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-20 z-10">
        {likedClubs.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg py-6 px-8">
            <p className="text-[#4A5568] text-xl text-center font-medium">
              Nothing added yet
            </p>
            <p className="text-gray-500 text-center mt-2">
              Go explore new clubs!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {likedClubs.map((club) => {
              const displayImage = imageMap[club.image] || noLogo;

              return (
                <div
                  key={club.id}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:bg-white/95 transition-colors duration-200"
                >
                  <div className="flex items-center p-4">
                    <div
                      className="w-12 h-12 flex-shrink-0 cursor-pointer"
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
                      <h3
                        className={`font-medium text-[#4A5568] ${
                          club.name.length > 25 ? "text-sm" : "text-base"
                        }`}
                      >
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
                        className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity duration-200"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NavigationBar className="z-20" />
    </div>
  );
}

export default LikedScreen;
