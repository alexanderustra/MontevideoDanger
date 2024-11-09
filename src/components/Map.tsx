import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { data } from "./data.ts";
import 'leaflet/dist/leaflet.css';

interface Seccional {
  nombre: string;
  coords: [number, number][];
  delitos: { [year: string]: number }; 
}

type Seccionales = Seccional[];

interface MapProps {
  year: number;
}

const getColor = (delitos: number) => {
  return delitos >= 22 ? '#8f0000' :
         delitos >= 15 ? '#ed2a11' :
         delitos >= 11 ? '#db5b0b' :
         delitos >= 7 ? '#ed8e11' :
         delitos >= 4 ? '#edba11' :
         delitos >= 2 ? '#e8f25a' :
         delitos >= 0 ? '#57e334' :
                        '#FFEDA0';
}

const MapComponent: React.FC<MapProps> = ({ year }) => {
  const [seccionales, setSeccionales] = useState<Seccionales>([]);

  useEffect(() => {
   setSeccionales(data.seccionales); 
  }, [year]);

  return (
    <MapContainer center={[-34.9011, -56.1645]} zoom={12} style={{ height: "600px", width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {seccionales.map((seccional, index) => {
        const delitosYear = seccional.delitos[year.toString()] || 0;
        const color = getColor(delitosYear);
        return (
          <Polygon
            key={index} 
            positions={seccional.coords}
            pathOptions={{ color, weight: 2, fillOpacity: 0.7 }}
          >
            <Popup>
              {delitosYear} Homicides In {year}
            </Popup>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;
