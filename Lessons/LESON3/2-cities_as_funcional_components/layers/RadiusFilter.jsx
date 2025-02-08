import { Circle, LayersControl } from "react-leaflet";

export function RadiusFilter({ radiusFilter, setRadiousFilter }) {
  if (!radiusFilter) return null;

  const { coordinates } = radiusFilter.feature.geometry;
  const layer = (
    <Circle
      center={[coordinates[1], coordinates[0]]}
      radius={radiusFilter.radius * 1000}
      eventHandlers={{
        dblclick: (e) => {
          e.originalEvent.view.L.DomEvent.stopPropagation(e);
          setRadiousFilter(null);
        },
      }}
      color={"red"}
      weight={1}
      fillOpacity={0.4}
    />
  );

  return (
    <LayersControl.Overlay checked name="Circle layer">
      {layer}
    </LayersControl.Overlay>
  );
}
