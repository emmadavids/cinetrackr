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

// POST request for submitting the form
router.post('/movies', MoviesController.Index);


  
  module.exports = router;

