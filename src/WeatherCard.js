import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';

const WeatherCard = () => {
  const [weatherData,setWeatherData] = useState(null);
  const [city,setCity] = useState("Chennai");
  const [cityField,setCityField] = useState("");
  const [cityTime,setCityTime] = useState("");
  //const [bgColor,setBgColor] = useState("h-3/4 w-3/4 my-10")
  
  useEffect(() => {
    async function getWeatherData(city){
      let weatherInfo;

      try{
        weatherInfo = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
      "&units=metric&appid=a6c5c155bc273ac1a5043f1d764b995d",{mode:"cors"});
      let weatherData = await weatherInfo.json();
      setWeatherData(weatherData);

      let d = new Date()
      let localTime = d.getTime();
      let localOffset = d.getTimezoneOffset()*60000
      let utc = localTime + localOffset;
      let cityTime = utc + (1000 * parseInt(weatherData.timezone)); 
      setCityTime(moment(cityTime).format("kk:mm a"));
      
      if(parseInt(moment(cityTime).format("kk:mm a").substring(0,2))>18){
          alert("Night");
      }
      console.log(await weatherData)
      }
      catch(e){
        alert("No internet connection");
      }
    }
    getWeatherData(city);  
  }, [city])

    

    let cityHandler = (e)=> {
      setCityField(e.target.value)
      console.log(e.target.value);
    }

    let citySetter = () => {
      setCity(cityField);
    }

    return (
      <div className = "h-3/4 w-3/4 my-10 font-formal">            
                <div className = "mx-auto bg-gray-200 rounded-2xl h-full w-full p-10 shadow-2xl grid items-center">
                    <div className = "flex flex-row justify-around">
                      <input onChange = {cityHandler} type="text" placeholder = "Enter a city" className = "border border-grey rounded-xl w-3/4 p-5"/>
                      <button 
                      onClick = {citySetter}
                      className = "bg-gray-300 border rounded-full h-20 w-20 hover:bg-gray-500 hover:text-white"><SearchIcon className = ""></SearchIcon></button>
                    </div>

                    {weatherData === null || weatherData === undefined || weatherData.message !== undefined? 

                    <h1 className = "text-center">City not found</h1> : 
                    <div className = "flex flex-col justify-center items-center md:items-stretch md:flex-row justify-around md:text-xl p-5">
                        <div className = "bg-white w-full md:w-1/3 border rounded-2xl flex flex-col grid justify-center items-center">
                            <h1 className = "text-center w-full">Temperature</h1>
                            <h1 className = "text-center text-2xl md:text-4xl w-full">{weatherData.main.temp}</h1>
                        </div>
                        <div className = "grid justify-center bg-white w-full md:w-1/3 border rounded-2xl p-5">
                            <div className = "grid justify-center">
                                  <img src={"https://openweathermap.org/img/w/"+weatherData.weather[0].icon+".png"} alt="" />
                            </div>
                            <p>City: {weatherData.name}</p>
                            <p>Local Time: {cityTime}</p>
                            <p>Weather: {weatherData.weather[0].main}</p>
                        </div>
                    </div>
                    
                    }
                    
                    
                </div>
        </div>
    )
}

export default WeatherCard
