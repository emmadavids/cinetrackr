const User = require('../models/user');
const fetchfunctions = require('./fetchfunctions')



const ReviewController = {

  // FetchInfo: async (req, res) => {
  //   const cast = await fetchfunctions.getMovieCast(movieId);
  //   const trailerUrl = await fetchfunctions.getMovieTrailerUrl(movieId);
  //   const movie = await fetchfunctions.getMovieById(movieId)
  // },


    AddReview:  (req, res) => {
      const userId = req.session.user._id;
      const { review, movieId } = req.body;
     

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