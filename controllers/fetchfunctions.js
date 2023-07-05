const API_KEY_T = require('../tmdb_api_key')

const fetch = require('node-fetch');


const currentYear = new Date().getFullYear();

// search for movies by year range
const searchMoviesByDateRange = (startDate = '', endDate = '') => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}`;

  if (startDate) {
    url += `&primary_release_date.gte=${startDate}`;
  }

  if (endDate) {
    url += `&primary_release_date.lte=${endDate}`;
  }
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      // Process the movie results
      console.log(movies);
      return movies;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
}

//get latest movies 
const getLatestMovies = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&sort_by=release_date.desc`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      // Process the movie results
      console.log(movies);
      return movies;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
}

// search by year 


const searchMoviesByTitle = (title) => {
  const encodedTitle = encodeURIComponent(title);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_T}&query=${encodedTitle}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      // Process the movie results
      console.log(movies);
      return movies;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
  }
  //searchMoviesByTitle('Star Wars');
  //getLatestMovies()
  searchMoviesByDateRange('2021', '2021')

  module.exports = searchMoviesByTitle;
  module.exports = searchMoviesByDateRange;
  module.exports = getLatestMovies;

