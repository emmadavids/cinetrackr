const ProfileController = {
    Index: (req, res) => {
        const watchList = req.session.user.watch_list; // Assuming the user's watch_list is stored in the session

        res.render("profile/profile", { watch_list: watchList });
    },
};
  
  module.exports = ProfileController;