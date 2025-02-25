import { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import FitBoundsButton from './controls/FitBoundsButton'
import ShowActiveFiltersControl from "./controls/show_active_filters";
import { CircleLayer } from "./layers/CircleLayer";
import BaseLayers from "./layers/BaseLayers";

const position = [25, -102];

export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null);
  const getGeoFilter = () => geoFilter;
  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;
  const [asyncCities, setAsyncCities] = useState({ features: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://172.29.60.18:8080/geoserver/tropical_cyclone/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tropical_cyclone%3Abreakpoints_2024&outputFormat=application%2Fjson&CQL_FILTER=country=%27MEXICO%27"
      );
      const cities = await response.json();
      setAsyncCities(cities);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
      <LayersControl>
       <BaseLayers />
        <CircleLayer
          data={asyncCities}
          setRadiusFilter={setRadiusFilter}
          getRadiusFilter={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
      </LayersControl>
      <FitBoundsButton />
      <ShowActiveFiltersControl getFilters={() => ({ geoFilter, radiusFilter })} />
    </MapContainer>
  );
};
