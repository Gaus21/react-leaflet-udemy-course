import { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { mountains } from "./data/highest_points";
import {irishCities2157} from "./data/irish_cities_2157"
import { MarkerLayer } from "./layers/MarkerLayer";
import { MarkerLayerCluster  } from "./layers/MarkerLayerCluster";
import { MarkerLayerWithTooltip } from "./layers/MarkerLayerWithTooltip";
import { RadiusFilter } from "./layers/RadiusFilter";
import { continents } from "./data/continents";
import Continents from "./layers/Continents";
import FitBoundsButton from '../2-cities_as_funcional_components/controls/FitBoundsButton'
import ShowActiveFiltersControl from "./controls/show_active_filters";
import { MarkerLayerWithTooltipReproject } from "./layers/MarkerLayerWithTooltipReproject";

const position = [0, 0];
export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null);

  const getGeoFilter = () => geoFilter;
  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;


  const [asyncCities, setAsyncCities] = useState({ features: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson"
      );
      const cities = await response.json();
      setAsyncCities(cities);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <MapContainer center={position} zoom={1} scrollWheelZoom={true}>
      <LayersControl>
        <LayersControl.BaseLayer checked name="OSM Streets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="ESRI World Imagery">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        
        <MarkerLayer
          data={asyncCities}
          setRadiusFilter={setRadiusFilter}
          getRadiusFilter={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
        <MarkerLayerCluster data={asyncCities}/>
        <MarkerLayerWithTooltipReproject   data={irishCities2157}/>
        <RadiusFilter
          radiusFilter={radiusFilter}
          setRadiousFilter={setRadiusFilter}
        />
        <MarkerLayerWithTooltip data={mountains} />
        <Continents
          data={continents}
          setGeoFilter={setGeoFilter}
          getGeoFilter={getGeoFilter}
        />
      </LayersControl>
      <FitBoundsButton />
      <ShowActiveFiltersControl getFilters={() => ({ geoFilter, radiusFilter })} />
    </MapContainer>
  );
};
