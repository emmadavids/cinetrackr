
const API_KEY_T = require('../tmdb_api_key')

const fetch = require('node-fetch');


const currentYear = new Date().getFullYear();




//get latest movies 
const getLatestMovies = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&sort_by=release_date.desc&media_type=movie`;

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


const getLatestPopularMovies = () => {
  // Get the current date
  const currentDate = new Date().toISOString().split('T')[0];

  // Calculate a recent date (e.g., 1 month ago)
  const recentDate = new Date();
  recentDate.setMonth(recentDate.getMonth() - 1);
  const formattedRecentDate = recentDate.toISOString().split('T')[0];

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&sort_by=popularity.desc&primary_release_date.gte=${formattedRecentDate}&primary_release_date.lte=${currentDate}&media_type=movie`;

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


// UPDATED MOVIE FUNCTION

const searchMovies = (title = "", year = "", genre = "") => {
  let url = "";
  
  if (title) {
    const encodedTitle = encodeURIComponent(title);
    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_T}&query=${encodedTitle}`;
    console.log(url);
  } else if (year) {
    const encodedYear = encodeURIComponent(year);
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&primary_release_year=${encodedYear}`;
    console.log(url);
  } else if (genre) {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_T}`)
      .then((response) => response.json())
      .then((data) => {
        const genres = data.genres;
        const selectedGenre = genres.find((g) => g.name.toLowerCase() === genre.toLowerCase());

        if (selectedGenre) {
          const genreId = selectedGenre.id;
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&with_genres=${genreId}`;
          console.log(url);
          return fetch(url);
        } else {
          console.error('Invalid genre');
          return [];
        }
      })
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        return movies;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  } else {
    console.error('No search parameters provided');
    return [];
  }
  
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      return movies;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};





module.exports = {

  getLatestMovies,
  getLatestPopularMovies,

  searchMovies,
};








