import React from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import { showDataOnMap } from "./utils.js";

const Maps = ({ countries, casesType, center, zoom }) => {
  return (
    <div className="h-fit w-full p-1 mt-4 bg-white border rounded-sm shadown-md">
      <MapContainer className="h-screen" center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default Maps;
