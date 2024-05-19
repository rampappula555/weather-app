import React from "react";
import WeatherDashboard from "./components/WeatherDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import EventPlanner from "./components/EventPlanner";
import Farmer from "./components/Farmer";
import Traveler from "./components/Traveler";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/event-planner" element={<EventPlanner />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/traveler" element={<Traveler />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
