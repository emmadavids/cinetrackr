const ProfileController = {
    Index: (req, res) => {
        const watchList = req.session.user.watch_list; // Assuming the user's watch_list is stored in the session

        res.render("profile/profile", { watch_list: watchList });
    },
    Archive: (req, res) => {
      const { movieId } = req.body;
      console.log("function called")
      // Remove the movie ID from the watch list
      const watchList = req.session.user.watch_list || [];
      console.log("watchlist", watchList)
      const updatedWatchList = watchList.filter((id) => id !== movieId);
      req.session.user.watch_list = updatedWatchList;
      console.log("updated:", updatedWatchList)
      // Add the movie ID to the already watched list
      const alreadyWatched = req.session.user.already_watched || [];
      console.log("already watched:", alreadyWatched)
      alreadyWatched.push(movieId);
      req.session.user.already_watched = alreadyWatched;
      console.log("already watched:", req.session.user.already_watched)
      // res.sendStatus(200);
      res.render("profile/profile", { watch_list: watchList });
    },
};
  
  module.exports = ProfileController;