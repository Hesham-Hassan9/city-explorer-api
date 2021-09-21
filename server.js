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
server.get('*', notFound);

function homeHandler(req, res) {
  res.send('home route');
}

async function WeatherHandler(req, res) {
  let searchQuery = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.API_KEY}`;
  console.log(url);
console.log("hi",axios.get(url));
  axios.get(url).then(WeatherResults => {
   
    let newWeatherArray = WeatherResults.data.map(element => {
      return new Forecast(element);
    });
    console.log("hi",newWeatherArray);
    res.send(newWeatherArray);
  }).catch(error => {
    res.send(error);
  });
  
}

function notFound(req, res) {
  res.status(404).send('NOT FOUND!!');
}
class Forecast {
  constructor(element) {
    this.data = element.datetime;
    this.desc = element.weather.description;
  }
}

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

// server.get('/getWeather',(req,res)=>{

//   let reqUrl = https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json;

//     let locResult = await axios.get(reqUrl);
//   let cityName = req.query.cityNameSelect;

//   let weatherInfo = weatherData.find((item)=>{
//     if(item.city_name === cityName) {

//       return item;
//     }

//   });
//   let newArr = weatherInfo.data.map(element =>{
//     return new Forecast(element.datetime, element.weather.description);
//   });
//   res.send(newArr);
// });

// 'use strict';

// // make a variable to use the express library
// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');

// // serevr has all the properities and methods in express
// const server = express();

// const weatherData = require('./assets/weather.json');

// const PORT = process.env.PORT;
// server.use(cors());

// // localhost:3005/
// server.get('/', (req, res) => {
//     res.status(200).send('home route');
// });

// class Forcast {
//     constructor(datetime, description) {
//         this.datetime = datetime;
//         this.description = description;
//     }
// }

// // localhost:3002/getweather?citName=Amman
// server.get('/getweather', (req, res) => {
//     //   res.send(weatherData);

//     let cityName = req.query.citName;

//     console.log(req.query);
//     console.log(req.query.citName);
//     let weatherInfo = weatherData.find((item) => {
//         if (item.city_name === cityName) {
//             return item;
            
//         }
//     }

//     );
//     let newArr = weatherInfo.data.map(element => {
//         return new Forcast(element.datetime, element.weather.description)
        
        
//     });
//     console.log(newArr);
//     res.send(newArr);
// });

// // localhost:3005/ANYTHING
// server.get('*', (req, res) => {
//     res.status(404).send('route is not found');
// });

// server.listen(PORT, () => {
//     console.log(`Listening on PORT ${PORT}`);
// });