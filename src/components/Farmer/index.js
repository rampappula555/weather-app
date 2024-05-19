import React, { useState } from "react";
import IndividualDashboard from "../IndividualDashboard";
import "./index.css";
const Farmer = () => {
  const [city, setCity] = useState("amalapuram");
  const [inpValue, setInpValue] = useState("amalapuram");
  const dataKeys = [
    { key: "main.temp", color: "#8884d8", name: "Temperature" },
    { key: "rain.3h", color: "#ff7300", name: "Precipitation" },
    { key: "main.humidity", color: "#82ca9d", name: "Humidity" },
  ];
  let title = "Farmer Dashboard";
  let placeholder = "Enter Farmer City";
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

export default Farmer;
