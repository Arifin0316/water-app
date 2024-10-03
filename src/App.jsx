import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';
import Header from './pages/Header';
import Footer from './pages/Footer';
import AboutUs from './pages/AboutUs';
import RadarWeather from './pages/Radar';
import FormLogin from './pages/FormLogin';
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <Router>
      < Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityName" element={<CityDetail />} />
        <Route path='/Radar' element={<RadarWeather/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/Login' element={<FormLogin/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
