import { WiDaySunny, WiNightClear, WiCloudy, WiDayCloudy, WiNightAltCloudy, WiRain, WiDayRain, WiNightAltRain, WiThunderstorm, WiSnow, WiDayFog } from 'react-icons/wi';

import cerah from '../assets/img/cerah.jpg';
import hujan from '../assets/img/hujan.jpg';
import mendung from '../assets/img/mendung.jpg';

const API_KEY = '2d1ad83cc2df4995b4b64506242809';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';


export function getWeatherIcon(code, isDay) {
    if (code === 1000) return isDay ? <WiDaySunny /> : <WiNightClear />;
    if (code === 1003) return isDay ? <WiDayCloudy /> : <WiNightAltCloudy />;
    if (code >= 1006 && code <= 1009) return <WiCloudy />;
    if (code >= 1063 && code <= 1072) return isDay ? <WiDayRain /> : <WiNightAltRain />;
    if (code >= 1150 && code <= 1201) return <WiRain />;
    if (code >= 1210 && code <= 1225) return <WiSnow />;
    if (code >= 1273 && code <= 1282) return <WiThunderstorm />;
    return <WiDayFog />; // default icon
  }
  

export function getWeatherBackground(code) {
    if (code === 1000) return cerah; // Clear weather
    if (code >= 1003 && code <= 1009) return mendung; // Cloudy weather
    if (code >= 1063 && code <= 1201) return hujan; // Rainy weather
    return cerah; // Default
  }
  
 export const fetchWeather = async (city) => {
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`);
      const data = await response.json();
      return {
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        conditionCode: data.current.condition.code,
        isDay: data.current.is_day,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };