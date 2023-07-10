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

            res.render("movies/show", { movie, user,  watchList });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    },

    async addToWatchList(req, res) {
        try {
            const { title } = req.body;
            const user = req.session.user;

            if (user && title) {
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    { $addToSet: { watch_list: title } },
                    { new: true }
                );

                if (updatedUser) {
                    console.log(`Added "${title}" to watch list for user: ${user._id}`);
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
    
                res.render("movies/search", { movies });
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal server error");
            }
        },
    };
    


  


module.exports = MoviesController;
