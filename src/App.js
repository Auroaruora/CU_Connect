import React, { useState, useEffect } from 'react';
import './App.css';
import LikedScreen from './LikedScreen';
import HomeScreen from './HomeScreen';
import ClubDetails from './ClubDetails';
import WelcomePage from './WelcomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [clubsData, setClubsData] = useState([]);
  const [likeClubs, setLikeClub] = useState([]);
  const [viewedClubs, setViewedClubs] = useState([]);

  useEffect(() => {
    fetch('/clubs.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch clubs.json');
        }
        return response.json();
      })
      .then((data) => {
        setClubsData(data);
      })
      .catch((error) => {
        console.error('Error fetching the clubs data:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("likedClubs", JSON.stringify(likeClubs));
  }, [likeClubs]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/home"
            element={
              <HomeScreen
                clubsData={clubsData}
                likedClubs={likeClubs}
                setLikedClubs={setLikeClub}
                viewedClubs={viewedClubs}
                setViewedClubs={setViewedClubs}
              />
            }
          />
          <Route
            path="/likedclubs"
            element={<LikedScreen likedClubs={likeClubs} setLikeClub={setLikeClub} />}
          />
          <Route
            path="/likedclubs/:clubId"
            element={<ClubDetails likedClubs={likeClubs} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
