const express = require("express");
const router = express.Router();
const MoviesController = require("../controllers/movies");
const ReviewController = require("../controllers/review");

const sessionChecker = (req, res, next) => {
	if (!req.session.user && !req.cookies.user_sid) {
		res.redirect("/sessions/new");
	} else {
		next();
	}
};

router.get("/", sessionChecker, MoviesController.Index);
router.post("/search", sessionChecker, MoviesController.SearchBy);
router.post("/watchlist", sessionChecker, MoviesController.addToWatchList);
router.get("/:id", MoviesController.show);
router.post("/:id/reviews", ReviewController.AddReview);


module.exports = router;

