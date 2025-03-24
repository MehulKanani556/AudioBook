import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/layout" element={<Layout />} >
           <Route path="dashboard" element={<Dashboard/>} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
