// const MoviesController = {
// Index: (req, res) => {
//     res.render("movies/index", { title: "Cinetrackr" });
// }
// };

// module.exports = MoviesController;

const fetch = require('node-fetch');

const MoviesController = {
  Index: async (req, res) => {
    try {
      const url = 'https://moviesdatabase.p.rapidapi.com/titles/search/title/%7Btitle%7D?exact=true&titleType=movie';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8d579e4061msh462a9c61bb26ac3p1cc9e7jsn0281809fedf9',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      const filmData = await response.json();

      res.render("movies/index", { title: "Cinetrackr", films: filmData });
    } catch (error) {
      console.error(error);
      res.render("movies/index", { title: "Cinetrackr", films: [] });
    }
  }
};

module.exports = MoviesController;
