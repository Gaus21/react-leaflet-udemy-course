// src/MapContext.tsx
import React, { createContext, useContext, useRef, useEffect, ReactNode } from 'react';
import { Map, View } from 'ol';
import 'ol/ol.css';

interface MapContextProps {
  map: Map | null;
}

const MapContext = createContext<MapContextProps>({ map: null });

export const useMap = () => useContext(MapContext);

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !map.current) {
      map.current = new Map({
        target: mapRef.current,
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    }
  }, []);

  return (
    <MapContext.Provider value={{ map: map.current }}>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
      {children}
    </MapContext.Provider>
  );
};

// src/App.tsx
import React, { useEffect } from 'react';
import { MapProvider, useMap } from './MapContext';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM } from 'ol/source';

const Layers: React.FC = () => {
  const { map } = useMap();

  useEffect(() => {
    if (map) {
      const osmLayer = new TileLayer({
        source: new OSM(),
      });

      map.addLayer(osmLayer);

      map.on('click', (event) => {
        console.log('Map clicked at:', event.coordinate);
      });

      return () => {
        map.removeLayer(osmLayer);
      };
    }
  }, [map]);

  return null;
};

const App: React.FC = () => {
  return (
    <MapProvider>
      <Layers />
    </MapProvider>
  );
};

export default App;