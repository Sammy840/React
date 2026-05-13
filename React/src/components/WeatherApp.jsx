import React, { useEffect, useState } from 'react'

const WeatherApp = () => {
    const [city, setCity] = useState('Benin City');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = `9152c7f787309ba0b31f9ed9fab5a758`;

    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

            if(!response.ok) throw new Error('City not found');

            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getBgColor = () => {
        if (!weather) return "#f0f0f0";
        return (weather.main.temp) > 25 ? "#ff8a4292" : "#4896ef8f";
    }

    useEffect(() => {
        fetchWeather();
    }, []);

  return (
    <div>
        <h1> Weather App</h1>
        <form onSubmit={(e) => {e.preventDefault(); fetchWeather();}}>
             <input 
                type="text" 
                placeholder='Enter a city'
                onChange={(e) => setCity(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
        {loading && <p>Searching...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        {weather && !loading && (
            <div style={{marginTop: '20px', backgroundColor: getBgColor(), transition: 'background-color 0.5s ease', width:'250px'}}>
                <h2>{weather.name} {weather.sys.country}</h2>
                <h1>{Math.round(weather.main.temp)}°C</h1>
                <p>{weather.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            </div>
        )}
    </div>
  )
}

export default WeatherApp