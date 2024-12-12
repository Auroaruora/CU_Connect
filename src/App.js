import React, { useState } from 'react';
import './App.css'; // Keep your global styles
import LikedScreen from './LikedScreen';
import ClubDetails from './ClubDetails';
import { useParams, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const clubsData = require('./clubs.json');
  const [likeClubs, setLikeClub] = useState([
    {
      id: 1,
      name: "Black Pre-Law Society",
      image: './assets/4.png',
    },
    {
      id: 2,
      name: "Onyx Dance Troupe",
      image: './assets/1.png',
    },
    {
      id: 3,
      name: "Society of Women Engineers",
      image: './assets/2.png',
    },
    {
      id: 4,
      name: "Columbia Spectator",
      image: './assets/3.png',
    },
  ]);

  return (
    <Router> {/* Wrap your app with Router */}
    <div className="app-container">
      <Routes> {/* Use Routes to define routes */}
        <Route path="/" element={<LikedScreen likedClubs={likeClubs} />} /> {/* LikedScreen route */}
        <Route path="/club/:clubId" element={<ClubDetails club={likeClubs} />} /> {/* ClubDetails route */}
      </Routes>
    </div>
  </Router>
    // <div className="app-container"> 
    //   <LikedScreen />
    // </div>
  );
}

export default App;
