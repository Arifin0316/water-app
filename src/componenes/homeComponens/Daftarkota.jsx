import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWeatherIcon } from '../../tools/utils.jsx';
import { gsap } from 'gsap';

function Daftarkota({ city }) {
  const cityRef = useRef(null); // Ref untuk elemen yang akan dianimasikan

  useEffect(() => {
    // Cek apakah cityRef valid sebelum menjalankan animasi
    if (cityRef.current) {
      gsap.fromTo(
        cityRef.current,
        { y: 100, opacity: 0 }, // Mulai dari bawah dengan opacity 0
        { y: 0, opacity: 1, duration: 2, ease: 'power3.out', delay: 0.3 } // Bergerak ke atas dengan opacity 1
      );
    }
  },[]); // Efek dijalankan hanya sekali saat komponen dirender

  if (!city) return null; // Guard clause jika tidak ada data city

  return (
    <Link
      to={`/city/${city.name}`}
      ref={cityRef} // Pasangkan ref ke elemen yang akan dianimasikan
      className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center hover:bg-indigo-200 transition-colors"
    >
      <h3 className="md:text-xl text-sm font-semibold text-indigo-800">{city.name}</h3>
      <div className="flex gap-4 items-center">
        <span className="lg:text-5xl text-2xl">{getWeatherIcon(city.conditionCode, city.isDay)}</span>
        <p className="font-medium text-xs md:text-xl">{city.temp}°C</p>
      </div>
    </Link>
  );
}

export default Daftarkota;
