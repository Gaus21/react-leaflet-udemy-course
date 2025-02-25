import { useEffect, useState } from 'react';
import { GeoJSON, LayersControl, LayerGroup } from 'react-leaflet';
import { useSelector } from 'react-redux';

const PolLayer = () => {
  const munData = useSelector((state) => state.mun);
  const [update, setUpdate] = useState(false);

  useEffect(() => {   
    setUpdate((prev) => !prev);
  }, [munData]);

  if (munData.status === 'loading') {
    return null;
  }

  const color = (status) => {
    if (status === '1') {
      return 'purple';
    } else if (status === '2') {
      return 'yellow';
    } else if (status === '3') {
      return 'pink';
    } else if (status === '4') {
      return 'red';
    } else {
      return 'green';
    }
  };

  const layer = (
    <GeoJSON
      key="geo-json-layer"
      data={munData.mun}
      style={(feature) => {
        return {
          color: color(feature.properties.status),
          weight: 0.7,
          fillOpacity: 0.2,
        };
      }}
    ></GeoJSON>
  );

  return (
    <LayersControl.Overlay name="Municipalities" checked>
      <LayerGroup key={update}>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};

export default PolLayer;