const User = require('../models/user');



const ReviewController = {
  AddReview: (req, res) => {
      const userId = req.session.user._id;
      console.log(userId);
      const { review, movieId } = req.body;
  
      console.log({review, movieId});

      // if (!review || !Array.isArray(review)) {
      //   const error = "Please enter a review.";
      //   return User.findById(userId)
      //     .then((user) => {
      //       res.render("movies/show", { user, error });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       res.render("error"); // Render an error page or handle the error in an appropriate way
      //     });
      //   }

        User.findById(userId)
            
        .then((user) => {
          console.log(user);   
          user.reviews = user.reviews || [];
          const author = `${user.firstName} ${user.lastName}`
          const newReview = { movieId, review, author }; //ADDED MOVIEID TO NEW REVIEW
          console.log(newReview);
         
          user.reviews.unshift(newReview)
          return user.save(); 
        })  
        .then(() => res.redirect(`/movies/${movieId}`))
        .catch((err) => {
          console.log(err);
        });
         
       
      }
    }



module.exports = ReviewController;