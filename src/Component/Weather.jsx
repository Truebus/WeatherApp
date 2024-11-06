import React, { useState } from 'react';
import { FaSearch, FaSun, FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

export const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherdata, setWeatherData] = useState({});
  const [error, setError] = useState('');
  const apiKey = import.meta.env.VITE_APP_SECRET_KEY; // Updated way to access environment variable
  const apiUrl=import.meta.env.VITE_URL;

  const fetchdata = async () => {
    try {
      const response = await fetch(`${apiUrl}=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(''); // Clear error on successful fetch
    } catch (err) {
      setError(err.message); // Set error message for UI
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchdata();
    } else {
      setError("Please enter a city name.");
    }
  };

  return (
    <div>
      <div className='bg-blue-500 h-[500px] w-96 p-5 m-auto border-2 border-black rounded-xl shadow-lg shadow-gray-50'>
        <div className='bg-white h-[450px] border rounded-md p-4'>
          <form onSubmit={handleSubmit}>
            <input 
              type='text' 
              onChange={handleChange} 
              value={city} 
              placeholder='Enter a city name:' 
              className='border border-green-300 rounded-md p-2 w-60'
            />
            <button type="submit" className='bg-orange-400 ml-2 p-1 border rounded-md text-center font-semibold'>
              Search <FaSearch className='m-auto' />
            </button>
          </form>
          {error && <p className='text-red-500'>{error}</p>} {/* Display error if any */}
          <div>
            <h2 className='font-bold text-2xl'>{weatherdata.name || "Weather Data"}</h2>
            <p className='bg-yellow-300 inline-block p-2 mt-4 outline-none border rounded-lg shadow-sm shadow-yellow-300'>
              {new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())}
            </p>
            <div className='flex justify-center mt-3'>
              <FaSun className='mt-1 mr-2' />
              <h6 className='text-sm font-semibold'>{weatherdata.weather ? weatherdata.weather[0].description : "No data"}</h6>
            </div>
            <h1 className='text-8xl'>{weatherdata.main?.temp || 27}&deg;C</h1>
          </div>
          <div className='flex gap-2'>
            <div className='bg-cyan-200 box-border h-[100px] w-[100px] mt-5 p-1 border-2 rounded-lg border-blue-800 shadow-sky-300 shadow-lg'>
              <FaWind className='m-auto text-xl mt-3' />
              <p className='font-semibold'>{weatherdata.wind?.speed || 0} km/h</p>
              <p>Wind</p>
            </div>
            <div className='bg-cyan-200 box-border h-[100px] w-[100px] mt-5 p-1 border-2 rounded-lg border-blue-800 shadow-sky-300 shadow-lg'>
              <WiHumidity className='m-auto text-3xl' />
              <p className='font-semibold'>{weatherdata.main?.humidity || 0}%</p>
              <p>Humidity</p>
            </div>
            <div className='bg-cyan-200 box-border h-[100px] w-[100px] mt-5 p-1 border-2 rounded-lg border-blue-800 shadow-sky-300 shadow-lg'>
              <MdVisibility className='m-auto text-xl mt-2' />
              <p className='font-semibold'>{(weatherdata.visibility / 1000) || 5} km</p>
              <p>Visibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
