import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import useSWR from 'swr';
import L from 'leaflet';
import 'leaflet-topojson';

const fetcher = (url) => fetch(url).then((res) => res.json());

const DynamicTopoJSONLayer = ({ geoServerUrl, layerName, minZoom }) => {
  const map = useMap();
  const [loadedAreas, setLoadedAreas] = useState([]); // Almacena las áreas ya cargadas

  const { data, mutate } = useSWR(null, fetcher, { revalidateOnFocus: false }); // SWR configurado inicialmente sin URL

  // Función para calcular el BBOX del mapa
  const getMapBBox = () => {
    const bounds = map.getBounds();
    return [
      bounds.getWest(), // minX
      bounds.getSouth(), // minY
      bounds.getEast(), // maxX
      bounds.getNorth(), // maxY
    ];
  };

  // Función para verificar si un área ya está cargada
  const isAreaLoaded = (bbox) => {
    return loadedAreas.some(
      (area) =>
        bbox[0] >= area[0] && bbox[1] >= area[1] && bbox[2] <= area[2] && bbox[3] <= area[3]
    );
  };

  // Función para cargar datos dinámicamente
  const loadTopoJSON = async () => {
    const zoom = map.getZoom();

    if (zoom >= minZoom) {
      const bbox = getMapBBox();

      if (!isAreaLoaded(bbox)) {
        const bboxString = bbox.join(',');
        const url = `${geoServerUrl}?service=WFS&version=2.0.0&request=GetFeature&typeName=${layerName}&outputFormat=application/json&bbox=${bboxString},EPSG:4326`;

        mutate(url, { revalidate: true }).then((data) => {
          if (data) {
            setLoadedAreas((prev) => [...prev, bbox]); // Añadir área cargada al cache
          }
        });
      }
    }
  };

  useEffect(() => {
    // Cargar datos inicialmente
    loadTopoJSON();

    // Escuchar eventos de movimiento y zoom
    map.on('moveend', loadTopoJSON);
    map.on('zoomend', loadTopoJSON);

    return () => {
      map.off('moveend', loadTopoJSON);
      map.off('zoomend', loadTopoJSON);
    };
  }, [map]);

  useEffect(() => {
    if (data) {
      const topoLayer = L.topoJson(data);

      // Agregar la capa al mapa
      topoLayer.addTo(map);

      // Limpiar la capa previa
      return () => {
        map.removeLayer(topoLayer);
      };
    }
  }, [data, map]);

  return null;
};

const App = () => {
  return (
    <MapContainer center={[0, 0]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <DynamicTopoJSONLayer
        geoServerUrl="http://<geoserver-url>/geoserver/wfs"
        layerName="<nombre_capa>"
        minZoom={10} // Nivel mínimo de zoom para cargar datos
      />
    </MapContainer>
  );
};

export default App;