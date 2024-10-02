import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';
import Header from './pages/Header';
import Footer from './pages/Footer';


function App() {
  return (
    <Router>
      < Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityName" element={<CityDetail />} /> {/* Routing ke halaman detail kota */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
