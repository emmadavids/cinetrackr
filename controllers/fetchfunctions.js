
const API_KEY_T = require('../tmdb_api_key')

const fetch = require('node-fetch');




//get movies by id

async function getMovieById(movieId) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_T}`;
    const response = await fetch(url);
    const data = await response.json();

     // Fetch the user score from the data and convert it to an integer
    const userScore = Math.round(data.vote_average * 10);

    // Add the userScore to the movie object
    data.userScore = userScore;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movie details");
  }
}




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

}




async function getMovieCast(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY_T}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  return data.cast;
}


async function getMovieTrailerUrl(movieId) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY_T}`;
    const response = await fetch(url);
    const data = await response.json();
    const trailers = data.results.filter(trailer => trailer.type === 'Trailer');
    if (trailers.length > 0) {
      return `https://www.youtube.com/embed/${trailers[0].key}`;
    } else {
      return ''; 
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movie trailer URL");
  }
}




module.exports = {

  getLatestMovies,
  getLatestPopularMovies,
  getMovieById,
  searchMovies,
  getMovieCast,
  getMovieTrailerUrl


};








