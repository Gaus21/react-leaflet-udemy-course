import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { openDB } from 'idb';
import L from 'leaflet';
import 'leaflet-topojson';

const DB_NAME = 'topojson_cache';
const STORE_NAME = 'layers';

// Función para inicializar IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'bbox' });
      }
    },
  });
};

// Guardar datos en IndexedDB
const saveToCache = async (bbox, data) => {
  const db = await initDB();
  await db.put(STORE_NAME, { bbox, data });
};

// Obtener datos desde IndexedDB
const getFromCache = async (bbox) => {
  const db = await initDB();
  return db.get(STORE_NAME, bbox);
};

const DynamicTopoJSONLayer = ({ geoServerUrl, layerName, minZoom }) => {
  const map = useMap();
  const [loadedLayers, setLoadedLayers] = useState([]); // Mantener las capas cargadas en memoria

  // Función para obtener el BBOX actual del mapa
  const getMapBBox = () => {
    const bounds = map.getBounds();
    return [
      bounds.getWest(), // minX
      bounds.getSouth(), // minY
      bounds.getEast(), // maxX
      bounds.getNorth(), // maxY
    ].join(',');
  };

  // Función para cargar datos dinámicamente
  const loadTopoJSON = async () => {
    const zoom = map.getZoom();

    if (zoom >= minZoom) {
      const bbox = getMapBBox();

      // Verificar si el BBOX ya está en cache
      const cachedData = await getFromCache(bbox);
      if (cachedData) {
        console.log('Cargando desde cache:', bbox);
        addTopoJSONToMap(cachedData.data);
      } else {
        // Cargar datos desde GeoServer si no están en cache
        const url = `${geoServerUrl}?service=WFS&version=2.0.0&request=GetFeature&typeName=${layerName}&outputFormat=application/json&bbox=${bbox},EPSG:4326`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();

          // Guardar en cache y agregar al mapa
          await saveToCache(bbox, data);
          addTopoJSONToMap(data);
        } else {
          console.error('Error al cargar datos desde GeoServer:', response.status);
        }
      }
    }
  };

  // Función para agregar datos TopoJSON al mapa
  const addTopoJSONToMap = (data) => {
    const topoLayer = L.topoJson(data);

    // Agregar al mapa
    topoLayer.addTo(map);
    setLoadedLayers((prev) => [...prev, topoLayer]);

    // Limpiar capas antiguas si es necesario
    return () => {
      loadedLayers.forEach((layer) => map.removeLayer(layer));
    };
  };

  useEffect(() => {
    // Cargar datos al iniciar y en eventos de movimiento
    loadTopoJSON();

    map.on('moveend', loadTopoJSON);
    map.on('zoomend', loadTopoJSON);

    return () => {
      map.off('moveend', loadTopoJSON);
      map.off('zoomend', loadTopoJSON);
    };
  }, [map]);

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
        minZoom={10} // Zoom mínimo para cargar datos
      />
    </MapContainer>
  );
};

export default App;