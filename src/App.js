import './components/reset.css'
import './App.css';

import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
import CarrentWeather from './components/current-weather/current-weather';

import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';



function App() {


  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null)


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    // (&lang=ru)

    const currentDate = new Date();
    // const tomorrowDate = new Date(currentDate);
    // tomorrowDate.setDate(currentDate.getDate() + 1);

    // const tomorrowTimestamp = Math.floor(tomorrowDate.getTime() / 1000);
    // console.log(tomorrowTimestamp);





    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&l`)
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&exclude=daily&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastWeatherFetch]).then(async (responce) => {
      const weatherResponce = await responce[0].json();
      const forecastResponce = await responce[1].json();

      setCurrentWeather(weatherResponce)
      setForecastWeather(forecastResponce)
    }).catch((err) => console.log(err))
  }



  return (
    <div className='container'>
      <Search
        onSearchChange={handleOnSearchChange}
      />
      {currentWeather && <CarrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>

  )
}

export default App;
