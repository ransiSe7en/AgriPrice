// import { useState, useEffect } from "react";
// import {
//    LineChart,
//    Line,
//    XAxis,
//    YAxis,
//    Tooltip,
//    ResponsiveContainer,
// } from "recharts";
// import "./WeatherForecast.css";

// const WeatherForecast = () => {
//    const [location, setLocation] = useState("Fetching location...");
//    const [coords, setCoords] = useState(null);
//    const [forecast, setForecast] = useState(null);
//    const [selectedDay, setSelectedDay] = useState(0);

//    useEffect(() => {
//       if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition(
//             async (position) => {
//                const { latitude, longitude } = position.coords;
//                setCoords({ latitude, longitude });
//                const cityName = await fetchCityName(latitude, longitude);
//                setLocation(cityName);
//                fetchWeather(latitude, longitude);
//             },
//             () => setLocation("Location access denied")
//          );
//       }
//    }, []);

//    const fetchCityName = async (lat, lon) => {
//       const response = await fetch(
//          `https://geocode.xyz/${lat},${lon}?geoit=json`
//       );
//       const data = await response.json();
//       return data.city || "Unknown location";
//    };

//    const fetchWeather = async (lat, lon) => {
//       const response = await fetch(
//          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`
//       );
//       const data = await response.json();
//       setForecast(data);
//    };

//    const getDayName = (dateStr) => {
//       return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
//    };

//    const getWeatherDescription = (code) => {
//       const descriptions = {
//          0: "Clear Sky",
//          1: "Mostly Clear",
//          2: "Partly Cloudy",
//          3: "Overcast",
//          45: "Foggy",
//          48: "Rime Fog",
//          51: "Drizzle",
//          61: "Light Rain",
//          80: "Rain Showers",
//          95: "Thunderstorms",
//       };
//       return descriptions[code] || "Unknown";
//    };

//    return (
//       <div className="weather-container">
//          <h2 contentEditable suppressContentEditableWarning>
//             {location}
//          </h2>
//          {forecast && (
//             <div>
//                <div className="days-container">
//                   {forecast.daily.time.map((date, index) => (
//                      <div
//                         key={index}
//                         className={`day-tile ${
//                            selectedDay === index ? "selected" : ""
//                         }`}
//                         onClick={() => setSelectedDay(index)}
//                      >
//                         <p className="day-name">{getDayName(date)}</p>
//                         <p className="date">
//                            {new Date(date).toLocaleDateString()}
//                         </p>
//                         <p className="temperature">
//                            {forecast.daily.temperature_2m_max[index]}°C
//                         </p>
//                         <p className="weather-description">
//                            {getWeatherDescription(
//                               forecast.daily.weathercode[index]
//                            )}
//                         </p>
//                      </div>
//                   ))}
//                </div>
//                <div className="hourly-forecast">
//                   <h3>Hourly Forecast</h3>
//                   <ResponsiveContainer width="100%" height={300}>
//                      <LineChart
//                         data={forecast.hourly.temperature_2m
//                            .slice(selectedDay * 24, (selectedDay + 1) * 24)
//                            .map((temp, hour) => ({ hour, temp }))}
//                      >
//                         <XAxis
//                            dataKey="hour"
//                            tickFormatter={(h) => `${h}:00`}
//                         />
//                         <YAxis />
//                         <Tooltip />
//                         <Line
//                            type="monotone"
//                            dataKey="temp"
//                            stroke="#8884d8"
//                            strokeWidth={2}
//                         />
//                      </LineChart>
//                   </ResponsiveContainer>
//                </div>
//             </div>
//          )}
//       </div>
//    );
// };

// export default WeatherForecast;

import { useState, useEffect } from "react";
import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
} from "recharts";
import "./WeatherForecast.css";

const WeatherForecast = () => {
   const [location, setLocation] = useState("Fetching location...");
   const [coords, setCoords] = useState(null);
   const [forecast, setForecast] = useState(null);
   const [selectedDay, setSelectedDay] = useState(0);
   const [isEditing, setIsEditing] = useState(false);
   const [inputLocation, setInputLocation] = useState("");

   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            async (position) => {
               const { latitude, longitude } = position.coords;
               setCoords({ latitude, longitude });
               const cityName = await fetchCityName(latitude, longitude);
               setLocation(cityName);
               fetchWeather(latitude, longitude);
            },
            () => setLocation("Location access denied")
         );
      }
   }, []);

   const fetchCityName = async (lat, lon) => {
      const response = await fetch(
         `https://geocode.xyz/${lat},${lon}?geoit=json`
      );
      const data = await response.json();
      return data.city || "Unknown location";
   };

   const fetchWeather = async (lat, lon) => {
      const response = await fetch(
         `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`
      );
      const data = await response.json();
      setForecast(data);
   };

   const handleLocationChange = (event) => {
      setInputLocation(event.target.value);
   };

   const handleLocationSubmit = (event) => {
      if (event.key === "Enter") {
         setLocation(inputLocation);
         setIsEditing(false);
         // Here, you should ideally fetch new coordinates for the input location and update the weather data
      }
   };

   const getDayName = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
   };

   const getWeatherDescription = (code) => {
      const descriptions = {
         0: "Clear Sky",
         1: "Mostly Clear",
         2: "Partly Cloudy",
         3: "Overcast",
         45: "Foggy",
         48: "Rime Fog",
         51: "Drizzle",
         61: "Light Rain",
         80: "Rain Showers",
         95: "Thunderstorms",
      };
      return descriptions[code] || "Unknown";
   };

   return (
      <div className="weather-container">
         {isEditing ? (
            <input
               type="text"
               value={inputLocation}
               onChange={handleLocationChange}
               onKeyPress={handleLocationSubmit}
               onBlur={() => setIsEditing(false)}
               autoFocus
            />
         ) : (
            <h2 onClick={() => setIsEditing(true)}>{location}</h2>
         )}
         {forecast && (
            <div>
               <div className="days-container">
                  {forecast.daily.time.map((date, index) => (
                     <div
                        key={index}
                        className={`day-tile ${
                           selectedDay === index ? "selected" : ""
                        }`}
                        onClick={() => setSelectedDay(index)}
                     >
                        <p className="day-name">{getDayName(date)}</p>
                        <p className="date">
                           {new Date(date).toLocaleDateString()}
                        </p>
                        <p className="temperature">
                           {forecast.daily.temperature_2m_max[index]}°C
                        </p>
                        <p className="weather-description">
                           {getWeatherDescription(
                              forecast.daily.weathercode[index]
                           )}
                        </p>
                     </div>
                  ))}
               </div>
               <div className="hourly-forecast">
                  <h3>Hourly Forecast</h3>
                  <ResponsiveContainer width="100%" height={300}>
                     <LineChart
                        data={forecast.hourly.temperature_2m
                           .slice(selectedDay * 24, (selectedDay + 1) * 24)
                           .map((temp, hour) => ({ hour, temp }))}
                     >
                        <XAxis
                           dataKey="hour"
                           tickFormatter={(h) => `${h}:00`}
                        />
                        <YAxis />
                        <Tooltip />
                        <Line
                           type="monotone"
                           dataKey="temp"
                           stroke="#8884d8"
                           strokeWidth={2}
                        />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
         )}
      </div>
   );
};

export default WeatherForecast;
