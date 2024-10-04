import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getWeatherIcon, getWeatherBackground } from '../tools/utils';
import { gsap } from 'gsap';
import cerah from '../assets/img/cerah.jpg';

const API_KEY = '2d1ad83cc2df4995b4b64506242809';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';
const ALERT_URL = 'https://api.weatherapi.com/v1/alerts.json';

function CityDetail() {
  const { cityName } = useParams();
  const [cityDetail, setCityDetail] = useState(null);
  const [background, setBackground] = useState(cerah);
  const [weatherAlert, setWeatherAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const timeRef = useRef(null);
  const weatherDisplayRef = useRef(null);
  const detailsRef = useRef(null);
  const alertRef = useRef(null);
  const buttonRef = useRef(null);

  const fetchCityWeather = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${cityName}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

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
      setError(error.message);
    } finally {
      setIsLoading(false);
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
    if (cityName) {
      fetchCityWeather();
      fetchWeatherAlert();
    }
  }, [cityName]);

  // Animation effect
  useEffect(() => {
    let ctx; // Context for GSAP animations

    if (cityDetail && cardRef.current) {
      // Kill any existing animations
      if (ctx) {
        ctx.revert();
      }

      // Create a new context
      ctx = gsap.context(() => {
        // Initial state
        gsap.set([
          cardRef.current,
          titleRef.current,
          timeRef.current,
          weatherDisplayRef.current,
          detailsRef.current,
          alertRef.current,
          buttonRef.current
        ], { 
          opacity: 0,
          y: 20 
        });

        // Create animation timeline
        const tl = gsap.timeline({
          defaults: {
            duration: 0.7,
            ease: "power3.out"
          }
        });

        // Sequence of animations
        tl.to(cardRef.current, { 
          opacity: 1, 
          y: 0,
        })
        .to(titleRef.current, { 
          opacity: 1, 
          y: 0 
        }, "-=0.4")
        .to(timeRef.current, { 
          opacity: 1, 
          y: 0 
        }, "-=0.4")
        .to(weatherDisplayRef.current, { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8
        }, "-=0.3")
        .to(detailsRef.current, { 
          opacity: 1, 
          y: 0,
          stagger: 0.1 
        }, "-=0.5")
        .to(alertRef.current, { 
          opacity: 1, 
          y: 0 
        }, "-=0.3")
        .to(buttonRef.current, { 
          opacity: 1, 
          y: 0 
        }, "-=0.2");
      });
    }

    // Cleanup function
    return () => {
      if (ctx) {
        ctx.revert(); // This will clean up all GSAP animations
      }
    };
  }, [cityDetail]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-xl">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-center text-xl text-red-600 mb-4">Error: {error}</p>
        <Link to="/" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!cityDetail) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-xl">No weather data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <img src={background} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div ref={containerRef} className="container mx-auto p-6 relative pt-32">
        <div ref={cardRef} className="opacity-0 bg-white bg-opacity-80 backdrop-blur-xl p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-4xl font-bold mb-4 text-indigo-700">
            {cityDetail.name}, {cityDetail.country}
          </h1>
          <p ref={timeRef} className="text-lg mb-6 text-gray-700">
            Waktu Lokal: {cityDetail.localtime}
          </p>

          <div ref={weatherDisplayRef} className="flex justify-center items-center gap-8 mb-6">
            <span className="text-7xl text-blue-600">
              {getWeatherIcon(cityDetail.conditionCode, cityDetail.isDay)}
            </span>
            <p className="text-6xl font-semibold text-indigo-700">{cityDetail.temp}°C</p>
          </div>

          <div ref={detailsRef} className="text-left text-lg">
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

          <div ref={alertRef}>
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
              <p className="mt-8 text-lg text-green-600">
                Tidak ada peringatan cuaca saat ini.
              </p>
            )}
          </div>

          <Link 
            ref={buttonRef}
            to="/" 
            className="inline-block mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 active:scale-50 transition duration-300"
          >
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CityDetail;