const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.Index);
router.post("/remove", ProfileController.removeFromWatchList);
router.post("/archive", ProfileController.addToAlreadyWatched);
router.post("/removewatched", ProfileController.removeFromAlreadyWatched);
module.exports = router;
