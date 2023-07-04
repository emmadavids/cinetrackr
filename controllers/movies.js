const MoviesController = {
Index: (req, res) => {
    res.render("movies/index", { title: "Cinetrackr" });
}
};

module.exports = MoviesController;