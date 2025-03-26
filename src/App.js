import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Review from "./Components/Review/Review";
// import Dashboard from "./Pages/Dashboard";
import AddReview from "./Components/Review/AddReview";
import EditReview from "./Components/Review/EditReview";
import HomeLabelJoin from "./Components/HomeLabelJoin/HomeLabelJoin";
import AddHomeLabelJoin from "./Components/HomeLabelJoin/AddHomeLabelJoin";
import EditHomeLabelJoin from "./Components/HomeLabelJoin/EditHomeLabelJoin";
import HomeLabels from "./Components/HomeLabels/HomeLabels";
import EditHomeLabels from "./Components/HomeLabels/EditHomeLabels";
import AddHomeLabels from "./Components/HomeLabels/AddHomeLabels";
import HomeCorousel from "./Components/HomeCorousel/HomeCorousel";
import AddHomeCorousel from "./Components/HomeCorousel/AddHomeCorousel";
import EditHomeCorousel from "./Components/HomeCorousel/EditHomeCorousel";
import Dashboard from "./Components/Pages/Dashboard";
import Role from "./Components/Pages/Role";

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/layout" element={<Layout />} >
          <Route path="review" element={<Review />} />
           <Route path="dashboard" element={<Dashboard/>} />
           <Route path="role" element={<Role/>} />
      
        
          <Route path="/layout/review" element={<Review />} />
          {/* <Route path="dashboard" element={<Dashboard/>} /> */}
          <Route path="addreview" element={<AddReview />} />
          <Route path="editreview" element={<EditReview />} />
          <Route path="homelabeljoin" element={<HomeLabelJoin />} />
          <Route path="addhomelabeljoin" element={<AddHomeLabelJoin />} />
          <Route path="edithomelabeljoin" element={<EditHomeLabelJoin />} />
          <Route path="homelabels" element={<HomeLabels />} />
          <Route path="edithomelabels" element={<EditHomeLabels />} />
          <Route path="addhomelabels" element={<AddHomeLabels />} />
          <Route path="homecorousel" element={<HomeCorousel />} />
          <Route path="addhomecorousel" element={<AddHomeCorousel />} />
          <Route path="edithomeCorousel" element={<EditHomeCorousel />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
