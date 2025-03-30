import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const countryCoords = {
  "United States of America": { lat: 37.0902, lng: -95.7129 },
  Mexico: { lat: 23.6345, lng: -102.5528 },
  Canada: { lat: 56.1304, lng: -106.3468 },
  India: { lat: 20.5937, lng: 78.9629 },
  China: { lat: 35.8617, lng: 104.1954 },
  Germany: { lat: 51.1657, lng: 10.4515 },
};

const getColor = (intensity) => {
  if (intensity >= 8) return "red";
  if (intensity >= 5) return "orange";
  return "yellow";
};

const MapComponent = ({ data }) => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const formattedData = data
      .filter((item) => item.country && countryCoords[item.country])
      .map((item) => ({
        ...item,
        coords: countryCoords[item.country],
      }));

    setMapData(formattedData);
  }, [data]);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {mapData.map((item, index) => (
        <CircleMarker
          key={index}
          center={[item.coords.lat, item.coords.lng]}
          radius={item.intensity * 2}
          fillColor={getColor(item.intensity)}
          color="black"
          weight={1}
          fillOpacity={0.6}
        >
          <Popup>
            <strong>{item.country}</strong>
            <br />
            <b>Intensity:</b> {item.intensity}
            <br />
            <b>Sector:</b> {item.sector || "N/A"}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
