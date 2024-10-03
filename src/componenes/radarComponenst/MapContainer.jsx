import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapContainer = ({ activeLayer, layers, mapInstanceRef }) => {
  const mapRef = useRef(null);
  
  useEffect(() => {
    if (mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current).setView([-2.548926, 118.014863], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const newLayer = L.tileLayer(layers[activeLayer].url, {
      attribution: '© OpenWeatherMap',
      opacity: activeLayer === 'temp' ? 0.8 : 0.7,
      zIndex: 1
    });

    newLayer.addTo(mapInstanceRef.current);

    return () => {
      if (newLayer) {
        newLayer.remove();
      }
    };
  }, [activeLayer, layers]);

  return (
    <div 
      ref={mapRef}
      className="z-10 w-full md:h-[600px] h-[300px] rounded-xl overflow-hidden shadow-inner border-4 border-white backdrop-blur-lg bg-white/10"
    ></div>
  );
};

export default MapContainer;
