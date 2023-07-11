const API_KEY_T = require('../tmdb_api_key');
const User = require("../models/user");

const ProfileController = {
  Index: async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);

      const moviesPromises = user.watch_list.map(async (movieId) => { // Changed variable name from `movieTitle` to `movieId`
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_T}` // Changed the API endpoint to fetch movie details by ID
        );
        const movie = await response.json();


          return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
          };

      });
      const alreadyWatchedMoviesPromises = user.already_watched.map(async (movieId) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_T}`
        );
        const movie = await response.json();

        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        };
      });

      const alreadyWatchedMovies = await Promise.all(alreadyWatchedMoviesPromises);
      const filteredAlreadyWatchedMovies = alreadyWatchedMovies.filter((movie) => movie);

      const movies = await Promise.all(moviesPromises);
      const filteredMovies = movies.filter((movie) => movie); // Filter out undefined values

      res.render('profile/profile', { watch_list: filteredMovies, already_watched: filteredAlreadyWatchedMovies });
    } catch (error) {
      console.error(error);
      res.render('error');
    }
  },

  async removeFromWatchList(req, res) {
    try {
      const { id } = req.body; // Changed from `title` to `id`
      const user = req.session.user;
  
      if (user && id) {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $pull: { watch_list: id } }, // Changed from `title` to `id`
          { new: true }
        );
  
        if (updatedUser) {
          console.log(`Removed movie with ID "${id}" from watch list for user: ${user._id}`);
        }
      }
  
      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
    addToAlreadyWatched: async (req, res) => {
    try {
      const { id } = req.body;
      const user = req.session.user;
  
      if (user && id) {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $pull: { watch_list: id }, $addToSet: { already_watched: id } },
          { new: true }
        );
  
        if (updatedUser) {
          console.log(`Moved movie with ID "${id}" from watch list to already watched for user: ${user._id}`);
        }
      }
  
      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }},
    removeFromAlreadyWatched: async (req, res) => {
      console.log("function called")
      try {
        const { id } = req.body;
        const user = req.session.user;
    
        if (user && id) {
          const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { already_watched: id } },
            { new: true }
          );
    
          if (updatedUser) {
            console.log(`Removed movie with ID "${id}" from already watched list for user: ${user._id}`);
          }
        }
    
        res.redirect("/profile");
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
    },
};

module.exports = ProfileController;
