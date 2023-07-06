const fetchfunctions = require("./fetchfunctions");
const User = require("../models/user");


const MoviesController = {
    async Index(req, res) {
        try {
            const movies = await fetchfunctions.getLatestPopularMovies();
            const user = req.session.user;

            res.render("movies/index", { movies, user });
        } catch (error) {
            console.error(error);
            res.render("movies/index", { movies: [], user: null });
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


// Render the view with an empty movies array on error
SearchByTitle: async (req, res) => {
    try {
        const title = req.body.title;
        const movies = await fetchfunctions.searchMoviesByTitle(title);

        res.render("movies/search", { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
},

    SearchByGenre: async (req, res) => {
        try {
            const genre = req.body.genre;
            const movies = await fetchfunctions.searchMoviesByGenre(genre);

            res.render("movies/search", { movies });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
        };

module.exports = MoviesController;
