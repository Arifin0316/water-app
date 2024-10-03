import { useEffect, useRef } from 'react';
import L from 'leaflet';

const TemperatureLegend = ({ activeLayer, showLegend, mapInstance }) => {
  const legendRef = useRef(null);

  useEffect(() => {
    if (legendRef.current) {
      legendRef.current.remove();
      legendRef.current = null;
    }

    if (activeLayer === 'temp' && mapInstance && showLegend) {
      const legend = L.control({ position: 'bottomright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

        const grades = [-20, -10, 0, 10, 20, 25, 30, 35];
        const colors = [
          '#9696ff', // -20°C
          '#82b7ff', // -10°C
          '#96e6ff', // 0°C
          '#96ff96', // 10°C
          '#ffd778', // 20°C
          '#ffa03c', // 25°C
          '#ff6e6e', // 30°C
          '#ff3c3c'  // 35°C
        ];

        div.innerHTML = '<h4 class="font-bold mb-2">Temperature (°C)</h4>';

        for (let i = 0; i < grades.length; i++) {
          const from = grades[i];
          const to = grades[i + 1];

          div.innerHTML += `<div class="flex items-center gap-2 mb-1">
            <i style="background: ${colors[i]}; width: 18px; height: 18px; display: inline-block"></i>
            ${from}${to ? '&ndash;' + to : '+'}°C
          </div>`;
        }

        return div;
      };

      legend.addTo(mapInstance);
      legendRef.current = legend;
    }

    return () => {
      if (legendRef.current) {
        legendRef.current.remove();
        legendRef.current = null;
      }
    };
  }, [activeLayer, showLegend, mapInstance]);

  return null;
};

export default TemperatureLegend;
