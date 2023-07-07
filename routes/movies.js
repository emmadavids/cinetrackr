const express = require("express");
const router = express.Router();
const MoviesController = require("../controllers/movies");

const sessionChecker = (req, res, next) => {
	if (!req.session.user && !req.cookies.user_sid) {
		res.redirect("/sessions/new");
	} else {
		next();
	}
};

router.get("/", sessionChecker, MoviesController.Index);
router.post("/search", sessionChecker, MoviesController.SearchByTitle);
router.post("/search", sessionChecker, MoviesController.SearchByGenre);
router.post("/watchlist", sessionChecker, MoviesController.addToWatchList);


  
  module.exports = router;

