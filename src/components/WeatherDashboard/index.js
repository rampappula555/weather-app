import React, { useEffect, useState } from "react";
import WeatherMap from "../WeatherMap";
import "./index.css";
import { RotatingLines } from "react-loader-spinner";
import WeatherDataCard from "../WeatherDataCard";
import { MdArrowUpward } from "react-icons/md";
import { FaArrowDownLong } from "react-icons/fa6";
const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
  notFound: "NOTFOUND",
};
const WeatherDashboard = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [weatherData, setWeatherData] = useState({});
  const [aqiData, setAqiData] = useState({});
  const [location, setLocation] = useState("amalapuram");
  const [inputValue, setInputValue] = useState("amalapuram");
  const [scrollTop, setScrollTop] = useState(false);
  async function fetchWeatherData(loc) {
    setApiStatus(apiStatusConstants.loading);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=b030f31947015de180f85f89b3873641&units=metric`
      );
      if (response.status === 404) {
        setApiStatus(apiStatusConstants.notFound);
        return;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  }

  async function fetchAqiData(lat, lon) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=b030f31947015de180f85f89b3873641`
      );
      if (response.status === 404) {
        setApiStatus(apiStatusConstants.notFound);
        return;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAqiData(data);

      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error("Fetch error:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  }
  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  useEffect(() => {
    if (Object.keys(weatherData).length !== 0) {
      fetchAqiData(weatherData.coord.lat, weatherData.coord.lon);
    }
  }, [weatherData]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setLocation(inputValue);
  };
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 400) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });
  function getLoadingView() {
    return (
      <div className="load-spinner-container">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="#3f51b5"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  function getSuccessView() {
    const { main, weather, wind, clouds, coord, name, sys, visibility } =
      weatherData;

    const aqi = aqiData?.list[0]?.main?.aqi;
    const graphData = {
      tempData: [
        { name: "Temp", value: main.temp },
        { name: "Feels Like", value: main.feels_like },
        { name: "Min Temp", value: main.temp_min },
        { name: "Max Temp", value: main.temp_max },
      ],
      humidityData: [
        { name: "Humidity", value: main.humidity },
        { name: "Pressure", value: main.pressure },
        { name: "Sea Level", value: main.sea_level },
        { name: "Ground Level", value: main.grnd_level },
      ],
      windData: [
        { name: "Speed", value: wind.speed },
        { name: "Gust", value: wind.gust },
        { name: "Direction", value: wind.deg },
      ],
    };
    const getAqiDescription = (aqi) => {
      switch (aqi) {
        case 1:
          return "Good";
        case 2:
          return "Fair";
        case 3:
          return "Moderate";
        case 4:
          return "Poor";
        case 5:
          return "Very Poor";
        default:
          return "Unknown";
      }
    };
    function handleScroll() {
      if (scrollTop) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
    return (
      <div className="dashboard">
        <h1>Real-time Data Dashboard</h1>
        <div className="location-input">
          <input
            type="search"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
          <button onClick={handleButtonClick}>Get Weather</button>
          <button className="scroll-button" onClick={handleScroll}>
            {scrollTop ? <MdArrowUpward /> : <FaArrowDownLong />}
          </button>
        </div>
        <h2>{name}</h2>
        <div className="panel weather-info">
          <p>Country: {sys.country}</p>
          <p>Description: {weather[0].description}</p>
          <p>Visibility: {visibility} meters</p>
          <p>Cloudiness: {clouds.all}%</p>
        </div>
        <div className="cards-container">
          <div className="panel temperature">
            <h2>Temperature</h2>
            <WeatherDataCard graphData={graphData.tempData} stroke="#8884d8" />
          </div>
          <div className="panel humidity">
            <h2>Humidity & Pressure</h2>
            <WeatherDataCard
              graphData={graphData.humidityData}
              stroke="#82ca9d"
            />
          </div>
          <div className="panel wind">
            <h2>Wind Speed</h2>
            <WeatherDataCard graphData={graphData.windData} stroke="#ff7300" />
          </div>
        </div>
        <div className="panel aqi">
          <h2>Air Quality Index</h2>
          <p>AQI: {aqi}</p>
          <p>Description: {getAqiDescription(aqi)}</p>
        </div>
        <div className="map-container">
          <WeatherMap location={coord} />
        </div>
      </div>
    );
  }

  function getFailureView() {
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
  function getNotFoundView() {
    return (
      <div className="not-found-container">
        <img
          src="https://static.vecteezy.com/system/resources/previews/025/902/337/original/no-gps-icon-map-location-pin-isolate-not-available-sign-design-isolate-on-white-background-vector.jpg"
          alt="not-found"
          className="city-not-found-image"
        />
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setInputValue("amalapuram");
            setLocation("amalapuram");
          }}
        >
          City not found.Please try a different city.
        </p>
      </div>
    );
  }
  switch (apiStatus) {
    case apiStatusConstants.loading:
      return getLoadingView();
    case apiStatusConstants.success:
      return getSuccessView();
    case apiStatusConstants.failure:
      return getFailureView();
    case apiStatusConstants.notFound:
      return getNotFoundView();
    default:
      return null;
  }
};

export default WeatherDashboard;
