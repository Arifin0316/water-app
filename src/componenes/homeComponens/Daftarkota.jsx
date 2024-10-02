import React from 'react';
import { Link } from 'react-router-dom';
import { getWeatherIcon } from '../../tools/utils.jsx';

function Daftarkota({ city }) {
  if (!city) return null; // Add a guard clause

  return (
    <Link to={`/city/${city.name}`} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center hover:bg-indigo-200 transition-colors">
      <h3 className="md:text-xl text-sm font-semibold text-indigo-800">{city.name}</h3>
      <div className="flex gap-4 items-center">
        <span className="lg:text-5xl text-2xl">{getWeatherIcon(city.conditionCode, city.isDay)}</span>
        <p className="font-medium text-xs md:text-xl">{city.temp}°C</p>
      </div>
    </Link>
  );
}

export default Daftarkota;