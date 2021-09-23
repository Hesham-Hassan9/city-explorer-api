"use strict";

let cache = {};

const axios = require("axios");

function moviesHandler(req, res) {
  let searchQuery = req.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_Movies_KEY}&query=${searchQuery}`;
  // console.log(url);

  if (cache[searchQuery] !== undefined) {
    console.log("The cache contain data");
    console.log(cache);
    res.send(cache[searchQuery]);
  } else {
    console.log("The cache is empty hit API");
    axios
      .get(url)
      .then((moviesResults) => {
        // console.log(moviesResults.data.results);
        let newMoviesArray = moviesResults.data.results.map((element) => {
          return new ForecastMovies(element);
        });
        cache[searchQuery] = newMoviesArray
        res.send(newMoviesArray);
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

class ForecastMovies {
  constructor(element) {
    this.title = element.title;
    this.overview = element.overview;
    this.releaseDate = element.release_date;
    this.posterPath = element.poster_path
      ? "https://image.tmdb.org/t/p/w500" + element.poster_path
      : "https://99minecraft.com/wp-content/themes/Minecraft/images/non.png";
    this.voteAverage = element.vote_average;
  }
}

module.exports = moviesHandler;
