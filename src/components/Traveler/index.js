import React, { useState } from "react";
import IndividualDashboard from "../IndividualDashboard";
import "./index.css";
const Traveler = () => {
  const [city, setCity] = useState("amalapuram");
  const [inpValue, setInpValue] = useState("amalapuram");
  const dataKeys = [
    { key: "main.temp", color: "#8884d8", name: "Temperature" },
    { key: "main.humidity", color: "#82ca9d", name: "Humidity" },
    { key: "wind.speed", color: "#ffc658", name: "Wind Speed" },
    { key: "rain.3h", color: "#ff7300", name: "Precipitation" },
  ];
  let title = "Traveler Dashboard";
  let placeholder = "Enter Travel Destination";
  function handleCityChange(event) {
    setInpValue(event.target.value);
  }
  function handleGetWeather() {
    setCity(inpValue);
  }
  return (
    <div className="weather-dashboard">
      <h2>{title}</h2>
      <div className="city-input">
        <input
          type="search"
          placeholder={placeholder}
          value={inpValue}
          onChange={handleCityChange}
        />
        <button onClick={handleGetWeather}>Get Weather</button>
      </div>
      <IndividualDashboard dataKeys={dataKeys} city={city} />
    </div>
  );
};

export default Traveler;
