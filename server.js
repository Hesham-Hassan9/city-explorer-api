'use strict';

// make a variable to use the express library
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// serevr has all the properities and methods in express
const server = express();

const weatherData = require('./assets/weather.json');

const PORT = process.env.PORT;
server.use(cors());

// localhost:3005/
// https://class07-301d33.herokuapp.com/
server.get('/', (req, res) => {
    res.status(200).send('home route');
});


// localhost:3005/getPokemon?citName=Amman&pokeLevel=10
// https://class07-301d33.herokuapp.com/?pokeName=charmander&pokeLevel=10
let weatherHandler = (request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    getWeather(lat, lon)
      .then(summaries => response.send(summaries))
      .catch((error) => {
        console.error(error);
        response.status(200).send('Sorry. Something went wrong!');
      });
  };
  
  // function to gather weather information based on client request query
  app.get('/weather', weatherHandler);

// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found');
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
