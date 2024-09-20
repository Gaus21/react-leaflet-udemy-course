import { Marker, Tooltip, useMap, LayersControl, LayerGroup } from "react-leaflet";
import { mountainIcon } from "../icons/mountainIcon";

export const MarkerLayerWithTooltip = ({ data }) => {
  const leafletMap = useMap();
  const layer =  data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name, elevation, continent } = feature.properties;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
        eventHandlers={{ click: (e) => leafletMap.panTo(e.latlng) }}
      >
        <Tooltip>
          <h3>Mt. {name}</h3>
          Continent: <b>{continent}</b> <br />
          Elevation: <b>{elevation} m</b>
        </Tooltip>
      </Marker>
    );
  });

  
  return (
    <LayersControl.Overlay checked name="Hihgest point">
        <LayerGroup> {layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
