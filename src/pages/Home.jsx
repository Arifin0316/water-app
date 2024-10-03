import React, { useState, useEffect } from 'react';

import Daftarkota from '../componenes/homeComponens/Daftarkota.jsx';
import MainCity from '../componenes/homeComponens/Maincity.jsx';
import SearchForm from '../componenes/homeComponens/SearchForm.jsx';

import cerah from '../assets/img/cerah.jpg';
import { getWeatherBackground, fetchWeather } from '../tools/utils.jsx';

function Home() {
  const [mainCity, setMainCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [background, setBackground] = useState(cerah); // Default background
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const initialCities = ['Jakarta', 'Surabaya', 'Bandung', 'Makassar', 'Aceh', 'Yogyakarta', 'Bali', 'Kupang'];

    const fetchAllWeather = async () => {
      const mainCityData = await fetchWeather('Malang');
      if (mainCityData) {
        setMainCity(mainCityData);
        setBackground(getWeatherBackground(mainCityData.conditionCode)); // Set background based on weather condition
      }

      const citiesData = await Promise.all(initialCities.map(fetchWeather));
      setCities(citiesData.filter((city) => city !== null));
    };

    fetchAllWeather();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      const data = await fetchWeather(searchQuery);
      if (data) {
        setMainCity(data);
        setBackground(getWeatherBackground(data.conditionCode)); // Update background when searching a new city
      }
    }
  };

  const displayedCities = isMobile ? cities.slice(0, 4) : cities;

  return (
    <section className="h-screen overflow-hidden bg-slate-200 pt-12">
      <img src={background} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 flex flex-col items-center pt-10">
       <SearchForm handleSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      </div>
      <div className="relative z-10 flex items-center lg:gap-24 h-full px-12 flex-col lg:flex-row mt-0 md:mt-12 lg:mt-0">
        <MainCity city={mainCity} />  {/* Panggil komponen MainCity dan passing data mainCity */}

        <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-4 grid-rows-2 gap-4 bg-transparent bg-opacity-80 backdrop-blur-5xl p-6 rounded-lg w-full mb-20 lg:mt-0 mx-0 mt-6 md:mt-36">
          {displayedCities.map((city, index) => (
            <Daftarkota key={city.name} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
