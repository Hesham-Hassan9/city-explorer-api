'use strict';
const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;

server.use(cors());

server.get('/', homeHandler);
server.get('/getWeather', WeatherHandler);
server.get('/getmovies', moviesHandler);
server.get('*', notFound);

function homeHandler(req, res) {
  res.send('home route');
}

function WeatherHandler(req, res) {
  let searchQuery = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.API_Weather_KEY}`;
  console.log(url);
  axios.get(url).then(WeatherResults => {

    let newWeatherArray = WeatherResults.data.data.map(element => {
      return new Forecast(element);
    });

    res.send(newWeatherArray);
  }).catch(error => {
    res.send(error);
  });

}

class Forecast {
  constructor(element) {
    this.datetime = element.datetime;
    this.description = element.weather.description;
  }
}


async function moviesHandler(req, res) {
  let searchQuery = req.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_Movies_KEY}&query=${searchQuery}`;
  console.log(url);
  axios.get(url).then(moviesResults => {
    console.log(moviesResults.data.results);
    let newMoviesArray = moviesResults.data.results.map(element => {
      return new ForecastMovies(element);
    });

    res.send(newMoviesArray);
  }).catch(error => {
    res.send(error);
  });

}

function notFound(req, res) {
  res.status(404).send('NOT FOUND!!');
}
class ForecastMovies {
  constructor(element) {
    this.title = element.title;
    this.overview = element.overview
    this.releaseDate = element.release_date;
    this.posterPath = element.poster_path? 'https://image.tmdb.org/t/p/w500' + element.poster_path : "https://99minecraft.com/wp-content/themes/Minecraft/images/non.png";
    this.voteAverage = element.vote_average;
  }
}

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});


