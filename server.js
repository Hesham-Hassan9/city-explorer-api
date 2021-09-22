'use strict';
const express = require('express');
require('dotenv').config();
const axios = require('axios');

const WeatherHandler = require('./modules/Weather.js')
const moviesHandler = require('./modules/Movies.js')
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


function notFound(req, res) {
  res.status(404).send('NOT FOUND!!');
}


server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});


