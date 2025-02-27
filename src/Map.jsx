import { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import FitBoundsButton from './controls/FitBoundsButton'
import ShowActiveFiltersControl from "./controls/show_active_filters";
import { CircleLayer } from "./layers/CircleLayer";
import BaseLayers from "./layers/BaseLayers";
import PolLayer from "./layers/PolLayer";
import WwLinLayer from "./layers/WwLinLayer";
import SelectStormId from "./controls/SelectStormId";
import Pol5Days from "./layers/Pol5Days";
import Lin5Days from "./layers/Lin5Days";

const position = [25, -102];
export const Map = () => {

  return (
    <>
      <SelectStormId />
      <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
        <LayersControl>
          <BaseLayers />
          <CircleLayer />
          <WwLinLayer />
          <PolLayer />
          <Pol5Days />
          <Lin5Days />
        </LayersControl>
        <FitBoundsButton />


        {/* <ShowActiveFiltersControl getFilters={() => ({ geoFilter, radiusFilter })} /> */}
      </MapContainer>

    </>
  );
};
