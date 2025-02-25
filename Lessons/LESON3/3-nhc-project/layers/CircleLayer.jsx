import {
  Marker,
  Circle,
  useMap,
  useMapEvents,
  LayerGroup,
  LayersControl,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import { latLng } from "leaflet";
import { PopupStatistics } from "./PopupStatistics";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import MovablePopup from "../customComponents/MovablePopup";
import {
  makePopupMovable,
  restorePopup,
} from "../customComponents/makePopupMovable";

export const CircleLayer = ({
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
        <CircleMarker
          pathOptions={{ color: 'blue', weight: 2, opacity: 0.7 }}
          key={String(coordinates)}
          radius={3}
          center={[coordinates[1], coordinates[0]]}
          eventHandlers={{
            click: (e) => makePopupMovable(e, map),
          }}
          doFitToBounds={true}
        >
          <Tooltip direction="top" offset={[0, -2]} opacity={0.6}>  
            {feature.properties.name}
          </Tooltip>
          <MovablePopup>
            <PopupStatistics
              feature={feature}
              setRadiusFilter={setRadiusFilter}
            />
          </MovablePopup>
        </CircleMarker>
      );
    });

  return (
    <LayersControl.Overlay name="Breakpoints" checked>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
