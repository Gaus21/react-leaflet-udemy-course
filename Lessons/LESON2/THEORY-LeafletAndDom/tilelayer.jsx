import { MapContainer, TileLayer } from 'react-leaflet';
import useSWR from 'swr';

// Fetcher para obtener tiles como blobs
const fetchTile = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch tile');
  return response.blob(); // Regresa el tile como un Blob
};

export default function MapWithSWR() {
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const { data, error, isLoading } = useSWR(
    tileUrl.replace('{z}', 13).replace('{x}', 2103).replace('{y}', 1233).replace('{s}', 'a'),
    fetchTile
  );

  // Convertimos el blob a una URL utilizable si está cargado
  const tileBlobUrl = data ? URL.createObjectURL(data) : null;

  if (isLoading) return <p>Loading tiles...</p>;
  if (error) return <p>Error loading tiles</p>;

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      {tileBlobUrl ? (
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileBlobUrl}
        />
      ) : null}
    </MapContainer>
  );
}