import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { Map } from 'leaflet';
import 'leaflet-topojson';

interface DynamicTopoJSONLayerProps {
  geoServerUrl: string;
  layerName: string;
}

const DynamicTopoJSONLayer: React.FC<DynamicTopoJSONLayerProps> = ({ geoServerUrl, layerName }) => {
  const map = useMap() as Map;
  const [topojsonData, setTopojsonData] = useState<any | null>(null);

  // Función para obtener el BBOX del mapa
  const getMapBBox = (): string => {
    const bounds = map.getBounds();
    return [
      bounds.getWest(), // minX
      bounds.getSouth(), // minY
      bounds.getEast(), // maxX
      bounds.getNorth(), // maxY
    ].join(',');
  };

  // Función para cargar datos desde GeoServer
  const fetchTopoJSON = async (): Promise<void> => {
    const bbox = getMapBBox();
    const url = `${geoServerUrl}?service=WFS&version=2.0.0&request=GetFeature&typeName=${layerName}&outputFormat=application/json&bbox=${bbox},EPSG:4326`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTopojsonData(data);
      } else {
        console.error('Error al cargar datos desde GeoServer:', response.status);
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  useEffect(() => {
    // Cargar datos inicialmente
    fetchTopoJSON();

    // Escuchar eventos de movimiento y zoom
    map.on('moveend', fetchTopoJSON);
    map.on('zoomend', fetchTopoJSON);

    return () => {
      map.off('moveend', fetchTopoJSON);
      map.off('zoomend', fetchTopoJSON);
    };
  }, [map]);

  useEffect(() => {
    if (topojsonData) {
      // Crear capa TopoJSON
      const topoLayer = L.topoJson(topojsonData);

      // Agregar la capa al mapa
      topoLayer.addTo(map);

      // Limpiar capas anteriores para evitar duplicados
      return () => {
        map.removeLayer(topoLayer);
      };
    }
  }, [topojsonData, map]);

  return null;
};

const App: React.FC = () => {
  return (
    <MapContainer center={[0, 0]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <DynamicTopoJSONLayer
        geoServerUrl="http://<geoserver-url>/geoserver/wfs"
        layerName="<nombre_capa>"
      />
    </MapContainer>
  );
};

export default App;
