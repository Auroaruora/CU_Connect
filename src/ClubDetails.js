import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#75AADB",
          backgroundImage: `
            radial-gradient(circle at 100% 0%, #9CC7E5 0%, transparent 45%),
            radial-gradient(circle at 0% 100%, #9CC7E5 0%, transparent 45%),
            linear-gradient(135deg, rgba(19, 60, 139, 0.1) 0%, rgba(255, 255, 255, 0.15) 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="flex-1 relative z-10 px-6 pt-6 max-w-md mx-auto w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/likedclubs")}
          className="mb-6 text-white hover:text-blue-100 flex items-center gap-2 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-lg">Back to Liked Clubs</span>
        </button>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl">
          {/* Club Image */}
          <div className="w-full h-44 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-3">
            <img
              src={displayImage}
              alt={club.name}
              className="w-40 h-40 object-contain"
              onError={(e) => {
                e.target.src = noLogo;
              }}
            />
          </div>

          <div className="px-6 py-5">
            {/* Club Header */}
            <h1 className="text-3xl font-bold text-[#002B7F] text-center">
              {club.name}
            </h1>
            {club.nickname && (
              <p className="text-center text-gray-600 text-lg mb-5">
                ({club.nickname})
              </p>
            )}

            {/* Club Description */}
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-[#002B7F] mb-2">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {club.description}
              </p>
            </div>

            {/* Events */}
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-[#002B7F] mb-2">
                Upcoming Events
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {club.events !== "N/A" ? club.events : "No events scheduled"}
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              {club.instagram !== "N/A" && (
                <a
                  href={club.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#002B7F] hover:text-blue-700 font-medium"
                >
                  Instagram →
                </a>
              )}

              {club.website !== "N/A" && (
                <a
                  href={club.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#002B7F] hover:text-blue-700 font-medium"
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
