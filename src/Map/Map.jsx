import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cities } from "../data/cities";
import { mountains } from "../data/highest_points";
import { continents } from "../data/continents";

import { useState } from "react";
import { MarkerLayer } from "../layers/MarkerLayer";
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip";
import { RadiusFilter } from "../layers/radiusFilter";
import { ContinentPolygonLayer } from "../layers/ContinentPolygonLayer";
import {FitBoundsToDataControl} from '../controls/fit_data_to_bounds'

export const Map = () => {
  const position = [0, 0];
  const scrollWheelZoom = true;

  const [geoFilter, setGeoFilter] = useState(null);
  const getGeoFilter = () => geoFilter;

  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;

  return (
    <MapContainer
      center={position}
      zoom={1}
      scrollWheelZoom={scrollWheelZoom}
      style={{ width: "100vw", height: "85vh" }}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM Streets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <MarkerLayer
          data={cities}
          setRadiusFilter={setRadiusFilter}
          getRadiusFilter={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
        <MarkerLayerWithTooltip data={mountains} />
        <RadiusFilter
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter}
        />
        <ContinentPolygonLayer
          data={continents}
          setGeoFilter={setGeoFilter}
          getGeoFilter={getGeoFilter}
        />
      </LayersControl>

      <FitBoundsToDataControl/>
    </MapContainer>
  );
};
