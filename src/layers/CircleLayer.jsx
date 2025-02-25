import {
  useMap,
  useMapEvents,
  LayerGroup,
  LayersControl,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import { PopupStatistics } from "./PopupStatistics";
import MovablePopup from "../customComponents/MovablePopup";
import {
  makePopupMovable,
  restorePopup,
} from "../customComponents/makePopupMovable";
import { useSelector } from "react-redux";

export const CircleLayer = () => {
  const breakpointData = useSelector((state) => state.breakpoints);
  const map = useMap();
  const mapEvents = useMapEvents({
    zoomstart(e) {
      restorePopup(e);
    },
    popupclose(e) {
      restorePopup(e);
    },
  });

  if (breakpointData.status === "loading") {
    return null;
  }

  const layer = breakpointData.features.map((feature) => {
    const { coordinates } = feature.geometry;
    return (
      <CircleMarker
        pathOptions={{ color: 'blue', weight: 1.5, opacity: 0.7 }}
        key={String(coordinates)}
        radius={5}
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
