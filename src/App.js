import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Components/Layout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/layout" element={<Layout />}></Route>
      </Routes>
    </div>
  );
};

export default App;
