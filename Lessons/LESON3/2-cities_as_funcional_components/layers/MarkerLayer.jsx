import { Marker, Popup } from "react-leaflet";
import { latLng } from "leaflet";
import { PopupStatistics } from "./PopupStatistics";

export const MarkerLayer = ({ data, setRadiusFilter, getRadiusFilter }) => {
  const radiusFilter = getRadiusFilter();
  let centerPoint;

  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    centerPoint = latLng(coordinates[1], coordinates[0]);
  }

  return data.features
    .filter((currentFeature) => {
      if (centerPoint) {
        const { coordinates } = currentFeature.geometry;
        const currentPoint = latLng(coordinates[1], coordinates[0]);
        return (
          centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius
        );
      } else {
        return true;
      }
    })
    .map((feature) => {
      const { coordinates } = feature.geometry;

      return (
        <Marker
          key={String(coordinates)}
          position={[coordinates[1], coordinates[0]]}
        >
          <Popup>
            <PopupStatistics
              feature={feature}
              setRadiusFilter={setRadiusFilter}
            />
          </Popup>
        </Marker>
      );
    });
};
