import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7782/7782342.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const MapUpdater = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([location.lat, location.lon], 13);
  }, [location, map]);
  return null;
};

const WeatherMap = ({ location }) => {
  return (
    <MapContainer
      center={[location.lat, location.lon]}
      zoom={13}
      style={{
        height: "600px",
        paddingLeft: "200px",
        paddingRight: "200px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.lat, location.lon]} icon={customIcon}>
        <Popup>Weather Location</Popup>
      </Marker>
      <MapUpdater location={location} />
    </MapContainer>
  );
};

export default WeatherMap;
