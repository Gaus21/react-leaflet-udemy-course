import React from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";
import { mountainIcon } from "../icons/mountainIcon";

export const MarkerLayerWithTooltip = ({ data }) => {
  const leafletMap = useMap();

  const handleClickMap = (e, f) => {
    console.log("click", f.properties.name);
    alert(`click On ${f.properties.name}`);
    leafletMap.panTo(e.latlng);
  };

  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name, elevation, continent } = feature.properties;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
        eventHandlers={{
          click: (e) => handleClickMap(e, feature),
          //mouseout: (e) => alert(`you out from ${name}`),
        }}
      >
        <Tooltip  
        >
          <h3>Mt. {name}</h3>
          Continent: <b>{continent}</b> <br />
          Elevation: <b>{elevation} m</b>
        </Tooltip>
      </Marker>
    );
  });
};
