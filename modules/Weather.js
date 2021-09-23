"use strict";

const axios = require("axios");
let cacheForWeather = {};
function WeatherHandler(req, res) {
  let searchQuery = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.API_Weather_KEY}`;
  console.log(url);
  if (cacheForWeather[searchQuery] !== undefined) {
    console.log("The cache For Weather contain data");
    console.log(cacheForWeather);
    res.send(cacheForWeather[searchQuery]);
  } else {
    console.log("The cache is empty hit API");
    axios
      .get(url)
      .then((WeatherResults) => {
        let newWeatherArray = WeatherResults.data.data.map((element) => {
          return new Forecast(element);
        });
        cacheForWeather[searchQuery] = newWeatherArray
        res.send(newWeatherArray);
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

class Forecast {
  constructor(element) {
    this.datetime = element.datetime;
    this.description = element.weather.description;
  }
}

module.exports = WeatherHandler;
