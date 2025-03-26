import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Role from "./Components/Pages/Role";
import Review from "./Components/Pages/Review"
import Subscription from "./Components/Pages/Subscription";

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
        </Route>
      </Routes>
    </div>
  );
};

export default App;
