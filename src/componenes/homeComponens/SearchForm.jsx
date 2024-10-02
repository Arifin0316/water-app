import React from 'react'
import { FiSearch } from 'react-icons/fi';

function SearchForm({handleSearch, searchQuery, setSearchQuery}) {
  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl px-4">
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full py-3 px-4 pr-12 rounded-full bg-white bg-opacity-80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 transition duration-300">
        <FiSearch size={20} />
      </button>
    </div>
  </form>
  )
}

export default SearchForm