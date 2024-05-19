import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BallTriangle } from "react-loader-spinner";

import "./index.css";
import { Link } from "react-router-dom";
const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
  notFound: "NOTFOUND",
};
const IndividualDashboard = ({ dataKeys, city }) => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (city.trim().length === 0) return;

    setApiStatus(apiStatusConstants.loading);
    if (city) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b030f31947015de180f85f89b3873641`
          );
          console.log(response);
          if (response.status === 404) {
            setApiStatus(apiStatusConstants.notFound);
            return;
          }
          if (!response.ok) {
            throw new Error("something went happen");
          }

          const data = await response.json();
          setWeatherData(data.list);
          setApiStatus(apiStatusConstants.success);
        } catch (error) {
          console.log("error");
          console.error("Error fetching weather data:", error);
          setApiStatus(apiStatusConstants.failure);
        }
      };

      fetchWeatherData();
    }
  }, [city]);
  function renderSuccessView() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={weatherData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dt_txt" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map(({ key, color, name }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              name={name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
  function renderLoadingView() {
    return (
      <div className="load-spinner-container-individual">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#3f51b5"
          ariaLabel="ball-triangle-loading-individual"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  function renderNotFoundView() {
    return (
      <div
        style={{
          paddingTop: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "200px",
          flexDirection: "column",
        }}
      >
        <div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/025/902/337/original/no-gps-icon-map-location-pin-isolate-not-available-sign-design-isolate-on-white-background-vector.jpg"
            alt="not-found"
            style={{ width: "100px", textAlign: "center" }}
          />
        </div>
        <Link to="/">
          <p style={{ cursor: "pointer", color: "black" }}>
            City not found.Please try a different city.
          </p>
        </Link>
      </div>
    );
  }
  function renderFailureView() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          paddingTop: "350px",
        }}
      >
        <h1>something went wrong</h1>
      </div>
    );
  }
  switch (apiStatus) {
    case apiStatusConstants.success:
      return renderSuccessView();
    case apiStatusConstants.loading:
      return renderLoadingView();
    case apiStatusConstants.notFound:
      return renderNotFoundView();
    case apiStatusConstants.failure:
      return renderFailureView();
    default:
      return null;
  }
};

export default IndividualDashboard;
