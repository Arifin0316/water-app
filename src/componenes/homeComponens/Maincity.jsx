import React from 'react';
import { Link } from 'react-router-dom';
import { getWeatherIcon } from '../../tools/utils.jsx';

function MainCity({ city }) {
  if (!city) return null;

  return (
    <Link
      to={`/city/${city.name}`}
      className="bg-white bg-opacity-80 backdrop-blur-5xl p-6 rounded-lg shadow-lg max-w-sm w-full hover:bg-indigo-200 transition-colors mt-6 mb:mt-12 lg:mt-0"
    >
      <h1 className="lg:text-3xl text-2xl font-bold mb-2 text-indigo-800">{city.name}</h1>
      <p className="text-indigo-800 font-medium mb-4">{city.country}</p>
      <div className="flex items-center gap-2 mb-4 text-indigo-800">
        <span className="lg:text-7xl text-4xl">{getWeatherIcon(city.conditionCode, city.isDay)}</span>
        <p className="lg:text-5xl text-3xl font-medium text-indigo-800">{city.temp}°C</p>
      </div>
      <p className="text-indigo-800 font-medium ">{city.condition}</p>
    </Link>
  );
}

export default MainCity;
