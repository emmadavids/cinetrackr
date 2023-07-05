const fetchfunctions = require('./fetchfunctions')


const MoviesController = {
    async Index(req, res) {
    try {
        const movies = await fetchfunctions.getLatestPopularMovies(); // Fetch the latest movies using the service function
        res.render('movies/index', { movies }); // Render the view and pass the movies data
    } catch (error) {
        console.error(error);
        res.render('movies/index', { movies: [] }); // Render the view with an empty movies array on error
    }
    },
};


module.exports = MoviesController;