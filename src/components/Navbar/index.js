import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
const Navbar = () => {
  return (
    <nav>
      <div className="weather-app-image-container">
        <NavLink to="/">
          <img
            className="weather-app-image"
            src="https://img.freepik.com/premium-vector/flat-sun-cloud-weather-web-icon_721813-233.jpg"
            alt="weather-app-logo"
          />
        </NavLink>
        <ul>
          <li>
            <NavLink to="/event-planner">Event Planner</NavLink>
          </li>
          <li>
            <NavLink to="/farmer">Farmer</NavLink>
          </li>
          <li>
            <NavLink to="/traveler">Traveler</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
