import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getWeatherIcon, getWeatherBackground } from '../tools/utils';

import cerah from '../assets/img/cerah.jpg';

const API_KEY = '2d1ad83cc2df4995b4b64506242809';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';
const ALERT_URL = 'https://api.weatherapi.com/v1/alerts.json';

function CityDetail() {
  const { cityName } = useParams();
  const [cityDetail, setCityDetail] = useState(null);
  const [background, setBackground] = useState(cerah);
  const [weatherAlert, setWeatherAlert] = useState(null); // State untuk menyimpan berita cuaca

  const fetchCityWeather = async () => {
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${cityName}`);
      const data = await response.json();
      setCityDetail({
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        conditionCode: data.current.condition.code,
        isDay: data.current.is_day,
        windSpeed: data.current.wind_kph,
        humidity: data.current.humidity,
        localtime: data.location.localtime,
      });

      const bg = getWeatherBackground(data.current.condition.code);
      setBackground(bg);
    } catch (error) {
      console.error('Error fetching city detail:', error);
    }
  };

  const fetchWeatherAlert = async () => {
    try {
      const alertResponse = await fetch(`${ALERT_URL}?key=${API_KEY}&q=${cityName}`);
      const alertData = await alertResponse.json();
      setWeatherAlert(alertData.alerts);
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
    }
  };

  useEffect(() => {
    fetchCityWeather();
    fetchWeatherAlert();
  }, [cityName]);

  if (!cityDetail) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-black mb-40">
      <img src={background} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="bg-white bg-opacity-80 backdrop-blur-xl p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-700">
          {cityDetail.name}, {cityDetail.country}
        </h1>
        <p className="text-lg mb-6 text-gray-700">Waktu Lokal: {cityDetail.localtime}</p>

        <div className="flex justify-center items-center gap-8 mb-6">
          <span className="text-7xl text-blue-600">{getWeatherIcon(cityDetail.conditionCode, cityDetail.isDay)}</span>
          <p className="text-6xl font-semibold text-indigo-700">{cityDetail.temp}°C</p>
        </div>

        <div className="text-left text-lg">
          <p className="mb-3 text-gray-700">
            <span className="font-semibold text-indigo-700">Kondisi Cuaca:</span> {cityDetail.condition}
          </p>
          <p className="mb-3 text-gray-700">
            <span className="font-semibold text-indigo-700">Kecepatan Angin:</span> {cityDetail.windSpeed} kph
          </p>
          <p className="mb-3 text-gray-700">
            <span className="font-semibold text-indigo-700">Kelembaban:</span> {cityDetail.humidity}%
          </p>
        </div>

        {/* Menampilkan berita cuaca */}
        {weatherAlert && weatherAlert.length > 0 ? (
          <div className="mt-8 p-4 bg-red-100 rounded-lg">
            <h2 className="text-xl font-bold text-red-600">Peringatan Cuaca:</h2>
            {weatherAlert.map((alert, index) => (
              <div key={index}>
                <p className="text-lg text-red-700">{alert.headline}</p>
                <p className="text-sm text-red-600">{alert.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-lg text-green-600">Tidak ada peringatan cuaca saat ini.</p>
        )}

        <Link to="/" className="inline-block mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300">
          Kembali
        </Link>
      </div>
    </div>
  );
}

export default CityDetail;
