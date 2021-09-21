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
server.get('/', (req, res) => {
    res.status(200).send('home route');
});

class Forcast {
    constructor(datetime, description) {
        this.datetime = datetime;
        this.description = description;
    }
}

// localhost:3002/getweather?citName=Amman
server.get('/getweather', (req, res) => {
    //   res.send(weatherData);

    let cityName = req.query.citName;

    console.log(req.query);
    console.log(req.query.citName);
    let weatherInfo = weatherData.find((item) => {
        if (item.city_name === cityName) {
            return item;
        }
    }

    );
    let newArr = weatherInfo.data.map(element => {
        return new Forcast(element.datetime, element.weather.description)
        
    });
    res.send(newArr);
});

// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found');
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});