import {
  Marker,
  useMap,
  LayersControl,
  Tooltip
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";

export const MarkerLayerCluster = ({ data }) => {
  const leafletMap = useMap();
  const layer = data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name } = feature.properties;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        eventHandlers={{
          click: (e) => leafletMap.panTo(e.latlng),
        }}
      >
        <Tooltip>
          <h3>{name}</h3>
        </Tooltip>
      </Marker>
    );
  });


  return (
    <LayersControl.Overlay name="Cluster Cities">
      <MarkerClusterGroup zoomToBoundsOnClick={false}
        polygonOptions={{
          fillColor: "#ffffff69",
          color: 'green',
          opacity: 1,
          fillOpacity: 0.8,
        }}>
        {layer}
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  );
};
