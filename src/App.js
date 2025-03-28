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
import AudioBook from "./Components/Pages/AudioBook";
import AddAudioBook from "./Components/Pages/AddAudioBook";
import EditAudiobooks from "./Components/Pages/EditAudiobooks";
import Genre from "./Components/Pages/Genre";
import VoucherUsed from "./Components/Pages/VoucherUsed";
import CoinLabel from "./Components/Pages/CoinLabel"
import CoinMaster from "./Components/Pages/CoinMaster";
import AddCoinMaster from "./Components/Pages/AddCoinMaster";
import EditCoinMaster from "./Components/Pages/EditCoinMaster";
import UserMaster from "./Components/Pages/UserMaster";
import AddUserMaster from "./Components/Pages/AddUserMaster";
import EditUserMaster from "./Components/Pages/EditUserMaster";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/layout" element={<Layout />} >
           <Route path="dashboard" element={<Dashboard/>} />
           <Route path="role" element={<Role/>} />   
           <Route path="subscription" element={<Subscription/>} />   
           <Route path="coinlabel" element={<CoinLabel/>} />   
           <Route path="coinmaster" element={<CoinMaster/>} />   
           <Route path="addcoinmaster" element={<AddCoinMaster/>} />   
           <Route path="editcoinmaster" element={<EditCoinMaster/>} />   
           <Route path="usermaster" element={<UserMaster/>} />   
           <Route path="addusermaster" element={<AddUserMaster/>} />   
           <Route path="editusermaster" element={<EditUserMaster/>} />   
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
           <Route path="audiobooks" element={<AudioBook />} />
           <Route path="addaudiobook" element={<AddAudioBook />} />
           <Route path="editaudiobook" element={<EditAudiobooks />} />
           <Route path="genre" element={<Genre />} />
           <Route path="voucherused" element={<VoucherUsed />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
