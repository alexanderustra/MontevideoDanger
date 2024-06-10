import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Seccional {
  seccional: string;
  coords: [number, number][];
  delitos: number;
  year: string;
}

interface MapProps {
  year: number;
}

const getColor = (delitos: number) => {
  return delitos >= 22 ? '#8f0000' :
         delitos >= 15 ? '#ed2a11' :
         delitos >= 11 ? '#db5b0b' :
         delitos >= 7 ? '#ed8e11' :
         delitos >= 4 ? '#edba11' :
         delitos >= 2  ? '#e8f25a':
         delitos >= 0  ? '#57e334' :
                        '#FFEDA0';
}

const MapComponent: React.FC<MapProps> = ({ year }) => {
  const [seccionales, setSeccionales] = useState<Seccional[]>([]);

  useEffect(() => {
    const fetchData = async () => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://<USERNAME>.github.io/MontevideoDanger'
      : '';

    const requests = Array.from({ length: 25 }, (_, i) => i + 1).map(async (i) => {
      const response = await fetch(`${baseUrl}/api/SECCIONAL ${i}/${year}`);
      if (!response.ok) {
        console.error(`Failed to fetch data for SECCIONAL ${i}`);
        return null;
      }
      return response.json();
    });

    const results = await Promise.all(requests);
    const filteredResults = results.filter((result) => result !== null);
    setSeccionales(filteredResults);
  } catch (error:any) {
    console.error(error.message);
  }
};
  

    fetchData();
  }, [year]);

  return (
    <MapContainer key={Math.random()} center={[-34.9011, -56.1645]} zoom={12} style={{height:"600px", width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {seccionales.map(seccional => {
        const delitosYear = seccional.delitos;
        const color = getColor(delitosYear);
        return (
          <Polygon
            key={Math.random()}
            positions={seccional.coords}
            pathOptions={{ color, weight: 2, fillOpacity: 0.7 }}
          >
            <Popup>
             {seccional.delitos} Homicides In {year}
            </Popup>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;