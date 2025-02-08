import {
  Marker,
  useMap,
  useMapEvents,
  LayerGroup,
  LayersControl,
} from "react-leaflet";
import { latLng } from "leaflet";
import { PopupStatistics } from "./PopupStatistics";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import MovablePopup from "../customComponents/MovablePopup";
import {
  makePopupMovable,
  restorePopup,
} from "../customComponents/makePopupMovable";

export const MarkerLayer = ({
  data,
  setRadiusFilter,
  getRadiusFilter,
  getGeoFilter,
}) => {
  const geoFilter = getGeoFilter();
  const radiusFilter = getRadiusFilter();

  let centerPoint;
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    centerPoint = latLng(coordinates[1], coordinates[0]);
  }
  const map = useMap();

  const mapEvents = useMapEvents({
    zoomstart(e) {
      restorePopup(e);
    },
    popupclose(e) {
      restorePopup(e);
    },
  });

  const layer = data.features
    .filter((currentFeature) => {
      let filterByRadius;
      let filterByGeo;

      if (centerPoint) {
        const { coordinates } = currentFeature.geometry;
        const currentPoint = latLng(coordinates[1], coordinates[0]);
        filterByRadius =
          centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius;
      }
      if (geoFilter) {
        filterByGeo = booleanPointInPolygon(currentFeature, geoFilter);
      }

      let doFilter = true;

      if (geoFilter && radiusFilter) {
        doFilter = filterByGeo && filterByRadius;
      } else if (geoFilter && !radiusFilter) {
        doFilter = filterByGeo;
      } else if (radiusFilter && !geoFilter) {
        doFilter = filterByRadius;
      }
      return doFilter;
    })
    .map((feature) => {
      const { coordinates } = feature.geometry;
      return (
        <Marker
          key={String(coordinates)}
          position={[coordinates[1], coordinates[0]]}
          eventHandlers={{
            click: (e) => makePopupMovable(e, map),
          }}
          doFitToBounds = {true}
        >
          <MovablePopup>
            <PopupStatistics
              feature={feature}
              setRadiusFilter={setRadiusFilter}
            />
          </MovablePopup>
        </Marker>
      );
    });

   
    
  return (
    <LayersControl.Overlay  name="World cities">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
