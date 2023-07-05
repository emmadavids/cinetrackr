const MovieFetch = require('./fetchfunctions');

const MoviesController = {
Index: (req, res) => {
    res.render("movies/index", { title: "Cinetrackr" });
},

SearchByTitle: async (req, res) => {
    try {
        const title = req.body.title;
        const movies = await MovieFetch.searchMoviesByTitle(title);

        res.render("movies/index", { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error')
    }
}

};

module.exports = MoviesController;