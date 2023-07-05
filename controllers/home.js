

const HomeController = {
    Index: (req, res) => {
      res.render("home/index", { title: "Cinetrackr" });
    },
  };
  
  module.exports = HomeController;