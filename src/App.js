import React, { useState } from 'react';
import './App.css';
import LikedScreen from './LikedScreen';
import HomeScreen from './HomeScreen';
import ClubDetails from './ClubDetails';
import WelcomePage from './WelcomePage';
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
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomeScreen clubsData={clubsData} />} />
          <Route path="/likedclubs" element={<LikedScreen likedClubs={likeClubs} setLikeClub={setLikeClub} />} />
          <Route path="/likedclubs/:clubId" element={<ClubDetails club={likeClubs} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;