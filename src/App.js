import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Review from "./Components/Review/Review";
import Dashboard from "./Components/Pages/Dashboard";
import Role from "./Components/Pages/Role";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/layout" element={<Layout />} >
          <Route path="review" element={<Review />} />
           <Route path="dashboard" element={<Dashboard/>} />
           <Route path="role" element={<Role/>} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
