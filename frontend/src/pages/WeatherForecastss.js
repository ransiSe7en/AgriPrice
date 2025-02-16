// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./WeatherForecast.css";

// const API_KEY = "aJkBJiqhXDECh5YWHlqATN7xXtPGXJ8z"; // Replace with your actual API key

// const WeatherForecast = () => {
//    const [weatherData, setWeatherData] = useState([]);
//    const [selectedDay, setSelectedDay] = useState(1); // Highlight "Today" (2nd tile)
//    const [currentLocation, setCurrentLocation] = useState(
//       "Fetching location..."
//    );
//    const [cityInput, setCityInput] = useState("");

//    useEffect(() => {
//       fetchCurrentLocationWeather();
//    }, []);

//    const fetchCurrentLocationWeather = async () => {
//       if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition(async (position) => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;

//             try {
//                const locationRes = await axios.get(
//                   `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
//                );

//                if (locationRes.data && locationRes.data.Key) {
//                   const cityName = locationRes.data.LocalizedName;
//                   fetchWeatherForecast(locationRes.data.Key, cityName);
//                }
//             } catch (error) {
//                console.error(
//                   "Error fetching location from geoposition:",
//                   error
//                );
//             }
//          });
//       } else {
//          alert("Geolocation is not supported by this browser.");
//       }
//    };

//    const fetchWeatherForecast = async (locationKey, cityName) => {
//       try {
//          const response = await axios.get(
//             `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`
//          );

//          if (response.data && response.data.DailyForecasts.length > 0) {
//             let forecasts = response.data.DailyForecasts;

//             // Get today & yesterday in Sri Lanka time
//             const today = new Date();
//             today.setHours(0, 0, 0, 0); // Normalize time
//             const yesterday = new Date(today);
//             yesterday.setDate(today.getDate() - 1);

//             // Format day names (Sri Lanka timezone)
//             const options = { weekday: "long", timeZone: "Asia/Colombo" };
//             const formatDate = (date) =>
//                date.toLocaleDateString("en-US", options);

//             // Find today’s index
//             const todayIndex = forecasts.findIndex(
//                (day) => formatDate(new Date(day.Date)) === formatDate(today)
//             );

//             if (todayIndex !== -1) {
//                // Create a "Yesterday" placeholder (fallback to today's weather)
//                const yesterdayWeather = {
//                   ...forecasts[todayIndex],
//                   Date: yesterday.toISOString(),
//                   Day: { IconPhrase: "Yesterday's Data Unavailable" },
//                   isPlaceholder: true,
//                };

//                // Arrange forecast order correctly
//                const orderedForecasts = [
//                   yesterdayWeather,
//                   ...forecasts.slice(todayIndex, todayIndex + 6),
//                ];

//                setWeatherData(orderedForecasts);
//                setSelectedDay(1); // Always highlight "Today" (2nd tile)
//                setCurrentLocation(cityName);
//             } else {
//                console.error("Today's forecast data not found!");
//             }
//          }
//       } catch (error) {
//          console.error("Error fetching weather data:", error);
//          alert("Failed to fetch weather data.");
//       }
//    };

//    // const fetchWeatherForecast = async (locationKey, cityName) => {
//    //    try {
//    //       const response = await axios.get(
//    //          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`
//    //       );

//    //       if (response.data && response.data.DailyForecasts.length > 0) {
//    //          let forecasts = response.data.DailyForecasts;

//    //          // Get today's date based on local timezone
//    //          const today = new Date();
//    //          const yesterday = new Date();
//    //          yesterday.setDate(today.getDate() - 1);

//    //          // Adjust timezone to GMT +5:30 (Sri Lanka time)
//    //          const options = { weekday: "long", timeZone: "Asia/Colombo" };

//    //          // Format function for date display
//    //          const formatDate = (date) =>
//    //             date.toLocaleDateString("en-US", options);

//    //          // Manually create "Yesterday's" weather (using today's forecast)
//    //          const yesterdayWeather = {
//    //             Date: yesterday.toISOString(),
//    //             Temperature: forecasts[0].Temperature,
//    //             Day: { IconPhrase: "Yesterday's data unavailable" },
//    //             isPlaceholder: true,
//    //          };

//    //          // Adjust forecast order: [Yesterday, Today, Next 5 Days]
//    //          const orderedForecasts = [yesterdayWeather, ...forecasts];

//    //          // Find today's index dynamically (since API might use a different base time)
//    //          const todayIndex = orderedForecasts.findIndex(
//    //             (day) => formatDate(new Date(day.Date)) === formatDate(today)
//    //          );

//    //          // Save data and highlight today's tile
//    //          setWeatherData(orderedForecasts);
//    //          setSelectedDay(todayIndex !== -1 ? todayIndex : 1);
//    //          setCurrentLocation(cityName);
//    //       }
//    //    } catch (error) {
//    //       console.error("Error fetching weather data:", error);
//    //       alert("Failed to fetch weather data.");
//    //    }
//    // };

//    const handleCitySearch = async () => {
//       if (!cityInput.trim()) return;

//       try {
//          const locationRes = await axios.get(
//             `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityInput}`
//          );

//          if (locationRes.data.length > 0) {
//             const locationKey = locationRes.data[0].Key;
//             const cityName = locationRes.data[0].LocalizedName;
//             fetchWeatherForecast(locationKey, cityName);
//          } else {
//             alert("City not found!");
//          }
//       } catch (error) {
//          console.error("Error fetching city data:", error);
//       }
//    };

//    return (
//       <div className="weather-container">
//          <h2>Weather Forecast</h2>
//          <p className="current-location">📍 {currentLocation}</p>

//          <div className="search-bar">
//             <input
//                type="text"
//                placeholder="Enter city name..."
//                value={cityInput}
//                onChange={(e) => setCityInput(e.target.value)}
//             />
//             <button onClick={handleCitySearch}>Search</button>
//          </div>

//          <div className="forecast-container">
//             {weatherData.map((day, index) => (
//                <div
//                   key={index}
//                   className={`forecast-tile ${
//                      index === selectedDay ? "selected" : ""
//                   }`}
//                   onClick={() => setSelectedDay(index)}
//                >
//                   <h4>
//                      {index === 0
//                         ? "Yesterday"
//                         : new Date(day.Date).toLocaleDateString("en-US", {
//                              weekday: "long",
//                           })}
//                   </h4>
//                   <p>
//                      {day.Temperature.Minimum.Value}°C -{" "}
//                      {day.Temperature.Maximum.Value}°C
//                   </p>
//                   <p>{day.Day.IconPhrase}</p>
//                </div>
//             ))}
//          </div>
//       </div>
//    );
// };

// export default WeatherForecast;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";

const API_KEY = "aJkBJiqhXDECh5YWHlqATN7xXtPGXJ8z"; // Replace with your actual API key

const WeatherForecast = () => {
   const [weatherData, setWeatherData] = useState([]);
   const [selectedDay, setSelectedDay] = useState(1); // Highlight "Today" (2nd tile)
   const [currentLocation, setCurrentLocation] = useState(
      "Fetching location..."
   );
   const [cityInput, setCityInput] = useState("");

   useEffect(() => {
      fetchCurrentLocationWeather();
   }, []);

   const fetchCurrentLocationWeather = async () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
               const locationRes = await axios.get(
                  `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
               );

               if (locationRes.data && locationRes.data.Key) {
                  const cityName = locationRes.data.LocalizedName;
                  fetchWeatherForecast(locationRes.data.Key, cityName);
               }
            } catch (error) {
               console.error(
                  "Error fetching location from geoposition:",
                  error
               );
               if (error.response && error.response.status === 503) {
                  alert("API usage limit exceeded. Please try again later.");
               }
            }
         });
      } else {
         alert("Geolocation is not supported by this browser.");
      }
   };

   const fetchWeatherForecast = async (locationKey, cityName) => {
      try {
         const response = await axios.get(
            `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`
         );

         if (response.data && response.data.DailyForecasts.length > 0) {
            let forecasts = response.data.DailyForecasts;

            // Get today & yesterday in Sri Lanka time
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize time
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            // Format day names (Sri Lanka timezone)
            const options = { weekday: "long", timeZone: "Asia/Colombo" };
            const formatDate = (date) =>
               date.toLocaleDateString("en-US", options);

            // Find today’s index
            const todayIndex = forecasts.findIndex(
               (day) => formatDate(new Date(day.Date)) === formatDate(today)
            );

            if (todayIndex !== -1) {
               // Create a "Yesterday" placeholder (fallback to today's weather)
               const yesterdayWeather = {
                  ...forecasts[todayIndex],
                  Date: yesterday.toISOString(),
                  Day: { IconPhrase: "Yesterday's Data Unavailable" },
                  isPlaceholder: true,
               };

               // Arrange forecast order correctly
               const orderedForecasts = [
                  yesterdayWeather,
                  ...forecasts.slice(todayIndex, todayIndex + 6),
               ];

               setWeatherData(orderedForecasts);
               setSelectedDay(1); // Always highlight "Today" (2nd tile)
               setCurrentLocation(cityName);
            } else {
               console.error("Today's forecast data not found!");
            }
         }
      } catch (error) {
         console.error("Error fetching weather data:", error);
         if (error.response && error.response.status === 403) {
            alert("API usage limit exceeded. Please try again later.");
         } else {
            alert("Failed to fetch weather data.");
         }
      }
   };

   const handleCitySearch = async () => {
      if (!cityInput.trim()) return;

      try {
         const locationRes = await axios.get(
            `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityInput}`
         );

         if (locationRes.data.length > 0) {
            const locationKey = locationRes.data[0].Key;
            const cityName = locationRes.data[0].LocalizedName;
            fetchWeatherForecast(locationKey, cityName);
         } else {
            alert("City not found!");
         }
      } catch (error) {
         console.error("Error fetching city data:", error);
         if (error.response && error.response.status === 403) {
            alert("API usage limit exceeded. Please try again later.");
         }
      }
   };

   return (
      <div className="weather-container">
         <h2>Weather Forecast</h2>
         <p className="current-location">📍 {currentLocation}</p>

         <div className="search-bar">
            <input
               type="text"
               placeholder="Enter city name..."
               value={cityInput}
               onChange={(e) => setCityInput(e.target.value)}
            />
            <button onClick={handleCitySearch}>Search</button>
         </div>

         <div className="forecast-container">
            {weatherData.map((day, index) => (
               <div
                  key={index}
                  className={`forecast-tile ${
                     index === selectedDay ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDay(index)}
               >
                  <h4>
                     {index === 0
                        ? "Yesterday"
                        : new Date(day.Date).toLocaleDateString("en-US", {
                             weekday: "long",
                          })}
                  </h4>
                  <p>
                     {day.Temperature.Minimum.Value}°C -{" "}
                     {day.Temperature.Maximum.Value}°C
                  </p>
                  <p>{day.Day.IconPhrase}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default WeatherForecast;
