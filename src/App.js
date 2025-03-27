import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Role from "./Components/Pages/Role";
import Review from "./Components/Pages/Review";
import HomeLabelJoin from "./Components/Pages/HomeLabelJoin";
import HomeLabels from "./Components/Pages/HomeLabels";
// import Review from "./Components/Pages/Review"
import Subscription from "./Components/Pages/Subscription";
import HomeCorousel from "./Components/Pages/HomeCorousel";
import PlaylistSongs from "./Components/Pages/PlaylistSongs";
import PlaylistMaster from "./Components/Pages/PlaylistMaster";
import EpisodeState from "./Components/Pages/EpisodeState";
import EpisodeUnlock from "./Components/Pages/EpisodeUnlock";
import Episodes from "./Components/Pages/Episodes";
import CastCrew from "./Components/Pages/CastCrew";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/layout" element={<Layout />} >
           <Route path="dashboard" element={<Dashboard/>} />
           <Route path="role" element={<Role/>} />   
           <Route path="subscription" element={<Subscription/>} />   
           <Route path="review" element={<Review />} />   
           <Route path="homelabeljoin" element={<HomeLabelJoin />} />
           <Route path="homelabels" element={<HomeLabels />} />
           <Route path="homecorousel" element={<HomeCorousel />} />
           <Route path="playlistsongs" element={<PlaylistSongs />} />
           <Route path="playlistmaster" element={<PlaylistMaster />} />
           <Route path="episodestate" element={<EpisodeState />} />
           <Route path="episodeunlock" element={<EpisodeUnlock />} />
           <Route path="episodes" element={<Episodes />} />
           <Route path="castcrew" element={<CastCrew />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
