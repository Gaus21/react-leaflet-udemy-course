import { GeoJSON, LayersControl, LayerGroup } from "react-leaflet";

export default function Continents({ data, setGeoFilter, getGeoFilter }) {
  const geoFilter = getGeoFilter();

  const layer = (
    <GeoJSON
      key="geo-json-layer"
      data={data}
      eventHandlers={{
        click: (e) => {
          setGeoFilter((prevState) => {
            const same = prevState === e.propagatedFrom.feature;
            return same ? null : e.propagatedFrom.feature;
          });
          //  e.originalEvent.view.L.DomEvent.stopPropagtion(e);
        },
      }}
      style={(feature) => {
        return {
          color: geoFilter === feature ? "red" : "blue",
          weight: 0.5,
          fillOpacity: 0.3,
        };
      }}
    ></GeoJSON>
  );

  return (
    <LayersControl.Overlay  name="Continents">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
}
