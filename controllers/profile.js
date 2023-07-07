
const API_KEY_T = require('../tmdb_api_key')
const User = require("../models/user");

const ProfileController = {
  Index: async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id); 

      const moviesPromises = user.watch_list.map(async (movieTitle) => {
        const encodedTitle = encodeURIComponent(movieTitle);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_T}&query=${encodedTitle}`
        );
        const data = await response.json();
        const movie = data.results[0];

        // Only return the movie if it has a valid poster path
        if (movie && movie.poster_path) {
          return {
            title: movie.title,
            poster_path: movie.poster_path,
          };
        }
      });

      const movies = await Promise.all(moviesPromises);
      const filteredMovies = movies.filter((movie) => movie); // Filter out undefined values

      res.render('profile/profile', { watch_list: filteredMovies });
    } catch (error) {
      console.error(error);
      res.render('error');
    }
  },
};

module.exports = ProfileController;