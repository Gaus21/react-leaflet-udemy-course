import React from "react";
import { Marker, Popup, Tooltip, useMap, LayersControl, LayerGroup } from "react-leaflet";
import { mountainIcon } from "../icons/mountainIcon";


export const MarkerLayerWithTooltip = ({ data }) => {
  const leafletMap = useMap();

  const handleClickMap = (e, f) => {
   
    leafletMap.panTo(e.latlng);
  };

  const layer = data.features.map((feature) => {
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
        <Tooltip>
          <h3>Mt. {name}</h3>
          Continent: <b>{continent}</b> <br />
          Elevation: <b>{elevation} m</b>
        </Tooltip>
        <Popup>
          <h3>Mt. {name}</h3>
          Continent: <b>{continent}</b> <br />
          Elevation: <b>{elevation} m</b>
        </Popup>
      </Marker>
    );
  });

  return (
    <LayersControl.Overlay  name="Highest poitns">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
