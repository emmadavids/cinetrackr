const fetchfunctions = require("./fetchfunctions");
const User = require("../models/user");


const MoviesController = {
    async Index(req, res) {
        try {
            const movies = await fetchfunctions.getLatestPopularMovies();
            const user = req.session.user;
            let watchList = [];

            if (user) {
                const userData = await User.findById(user._id);
                if (userData) {
                    watchList = userData.watch_list;
                }
            }

            res.render("movies/index", { movies, user, watchList });
        } catch (error) {
            console.error(error);
            res.render("movies/index", { movies: [], user: null, watchList: [] });
        }
    },

    async show(req, res) {
        try {
            const movieId = req.params.id;
            const user = req.session.user;
            let watchList = [];

            if (user) {
                const userData = await User.findById(user._id);
                if (userData) {
                    watchList = userData.watch_list;
                }
            }

            const movie = await fetchfunctions.getMovieById(movieId);
            const cast = await fetchfunctions.getMovieCast(movieId); // Fetch cast information

            res.render("movies/show", { movie, user, watchList, cast }); // Pass cast data to the template
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    },

    async addToWatchList(req, res) {
        try {
            const { movieId } = req.body; // Changed from 'title' to 'movieId'
            const user = req.session.user;

            if (user && movieId) {
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    { $addToSet: { watch_list: movieId } }, // Changed from 'title' to 'movieId'
                    { new: true }
                );

                if (updatedUser) {
                    console.log(`Added movie with ID "${movieId}" to watch list for user: ${user._id}`);
                }
            }

            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },



    SearchBy: async (req, res) => {
        try {
            const title = req.body.title;
            const releaseDate = req.body.release_date;
            const genre = req.body.genre;
            const movies = await fetchfunctions.searchMovies(title, releaseDate, genre);
            const user = req.session.user;
            let watchList = [];

            if (user) {
                const userData = await User.findById(user._id);
                if (userData) {
                    watchList = userData.watch_list;
                }
            }

            res.render("movies/search", { movies, watchList });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    },
};






module.exports = MoviesController;
