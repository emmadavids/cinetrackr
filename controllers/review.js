const User = require('../models/user');
const fetchfunctions = require('./fetchfunctions')



const ReviewController = {

  // FetchInfo: async (req, res) => {
  //   const cast = await fetchfunctions.getMovieCast(movieId);
  //   const trailerUrl = await fetchfunctions.getMovieTrailerUrl(movieId);
  //   const movie = await fetchfunctions.getMovieById(movieId)
  // },


    AddReview: async (req, res) => {
      const userId = req.session.user._id;
      const { review, movieId } = req.body;
      const cast = await fetchfunctions.getMovieCast(movieId);
      const trailerUrl = await fetchfunctions.getMovieTrailerUrl(movieId);
    
      if (!review || !movieId) {
        const error = "Please enter a review.";
        return User.findById(userId)
          .then((user) => {
            return fetchfunctions.getMovieById(movieId)
              .then((movie) => {
                res.render("movies/show", { user, movie, cast, trailerUrl, userScore: movie.userScore, error });
              });
          })
          .catch((err) => {
            console.log(err);
            res.render("movies/show");
        });
    }

        User.findById(userId)
            
        .then((user) => {
          user.reviews = user.reviews || [];
          const author = `${user.firstName} ${user.lastName}`
          const movieId = req.params.id;
          const newReview = { movieId, review, author}; //ADDED MOVIEID TO NEW REVIEW
          user.timePosted = new Date();
         
        user.reviews.push(newReview)
 
          return user.save(); 
        })  
        .then(() => res.redirect(`/movies/${movieId}`))
        .catch((err) => {
          console.log(err);
        });
         
       
      }
    }



module.exports = ReviewController;