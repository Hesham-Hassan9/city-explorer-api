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
server.get('/weather', (req, res) => {
    //   res.send(weatherData);
    
        let cityName = req.query.citName;
        
        console.log(req.query);
        console.log(req.query.citName);
        let weatherInfo = weatherData.find((item) => {
            try {
            if (item.city_name === cityName) {
                
                return item;
            }
        }
        catch
        {
            console.log("hi");
            res.status(500).send('Houston, we have an error!');
        }

        });
        console.log('weatherInfo', weatherInfo);
        res.send(weatherInfo);

    
});

// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found');
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
