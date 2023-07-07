const fetchfunctions = require("./fetchfunctions");
const MoviesController = {
    async Index(req, res) {
        try {
            const movies = await fetchfunctions.getLatestPopularMovies(); // Fetch the latest movies using the service function
            res.render("movies/index", { movies }); // Render the view and pass the movies data
        } catch (error) {
            console.error(error);
            res.render("movies/index", { movies: [] });
        }
    }, 

    SearchBy: async (req, res) => {
        try {
            const title = req.body.title;
            const releaseDate = req.body.release_date;
            const genre = req.body.genre;
            const movies = await fetchfunctions.searchMovies(title, releaseDate, genre);
    
            res.render("movies/search", { movies });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
};

module.exports = MoviesController;


