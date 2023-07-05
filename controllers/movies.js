const movieSearch = require('./fetchfunctions.js');

const MoviesController = {
Index: async (req, res) => {
          try {
            const year = req.query.year; // Get the year from the request query parameters
            const movies = await searchMoviesByDateRange(year); // Fetch movies based on the year
      
            res.render("movies/index", { movies }); // Pass the movies data to the view
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        }
      };
      

module.exports = MoviesController;