import React, { useRef, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { gsap } from 'gsap';

function SearchForm({ handleSearch, searchQuery, setSearchQuery }) {
  const formRef = useRef(null); // Ref untuk elemen form

  useEffect(() => {
    // Cek apakah formRef valid sebelum menjalankan animasi
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: -50, opacity: 0 }, // Mulai dari atas dengan opacity 0
        { y: 0, opacity: 1, duration: 2, ease: 'power3.out' } // Bergerak ke bawah dengan opacity 1
      );
    }
  },[]); 

  return (
    <form ref={formRef} onSubmit={handleSearch} className="w-full max-w-2xl md:px-4 px-12">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-3 px-4 pr-12 rounded-full bg-white bg-opacity-80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 transition duration-300"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
