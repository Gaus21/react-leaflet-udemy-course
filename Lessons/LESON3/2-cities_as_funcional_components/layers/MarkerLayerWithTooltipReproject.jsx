import { Marker, Popup, Tooltip, LayersControl, LayerGroup } from "react-leaflet";
import proj4 from "proj4";

const ITM = 'EPSG:2157';
const WGS = 'EPSG:4326'

//data from  https://epsg.io/ : copy from export Proj4js

proj4.defs(ITM, "+proj=tmerc +lat_0=53.5 +lon_0=-8 +k=0.99982 +x_0=600000 +y_0=750000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
proj4.defs(WGS, "+proj=longlat +datum=WGS84 +no_defs +type=crs");


export const MarkerLayerWithTooltipReproject = ({ data }) => {
  const layer = data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name, elevation, continent } = feature.properties;
    
    const reprojectedCoordinates = proj4(ITM, WGS, coordinates);

    return (
      <Marker
        key={String(coordinates)}
        position={[reprojectedCoordinates[1], reprojectedCoordinates[0]]}
      >
        <Tooltip>
          <h3> {name}</h3>
          Elevation: <b>{elevation} m</b>

        </Tooltip>
        <Popup>
          <h3>{name}</h3>
          Elevation: <b>{elevation} m</b>
        </Popup>
      </Marker>
    );
  });

  return (
    <LayersControl.Overlay name="Irish cities reprojected">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
