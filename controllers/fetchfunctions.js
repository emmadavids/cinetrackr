
const API_KEY_T = require('../tmdb_api_key')

const fetch = require('node-fetch');


const currentYear = new Date().getFullYear();

//search for movies by year range
const searchMoviesByDateRange = (startDate = '', endDate = '') => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&sort_by=popularity.desc`;

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


const searchMoviesByTitle = (title) => {
  const encodedTitle = encodeURIComponent(title);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_T}&query=${encodedTitle}&sort_by=popularity.desc&media_type=movie&sprt_by=popularity.desc`;

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

const searchMoviesByGenre = (genre) => {
  const encodedGenre = encodeURIComponent(genre);
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&with_genres=${encodedGenre}&sort_by=popularity.desc`;
  // 'https://api.themoviedb.org/3/genre/movie/list?language=en'

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
};

// UPDATED MOVIE FUNCTION

const searchMovies = (title = "", year = "", genre = "") => {

  const encodedTitle = encodeURIComponent(title);
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_T}&query=${encodedTitle}`;

  if (year) {
    const encodedYear = encodeURIComponent(year);
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&primary_release_year=${encodedYear}`;
    console.log("URL HERE>>>>>>>>>>", url)
  }
  
  if (genre) {
    // Fetch genre list
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_T}`)
      .then((response) => response.json())
      .then((data) => {
        const genres = data.genres;
        const selectedGenre = genres.find((g) => g.name.toLowerCase() === genre.toLowerCase());

        if (selectedGenre) {
          const genreId = selectedGenre.id;
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_T}&with_genres=${genreId}`;

          if (releaseDate) {
            url += `&primary_release_date.gte=${encodedReleaseDate}`;
          }
        }

        return fetch(url);
      })
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        console.log(movies);
        return movies;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  } else {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        console.log(movies);
        return movies;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
  };




module.exports = {
  searchMoviesByTitle,
  searchMoviesByDateRange,
  getLatestMovies,
  getLatestPopularMovies,
  searchMoviesByGenre,
  searchMovies,
};








