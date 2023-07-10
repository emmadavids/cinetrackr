const User = require('../models/user');



const ReviewController = {
  AddReview: (req, res) => {
      const userId = req.session.user;
      const { reviews } = req.body;
      const movieId = req.params.id;
      console.log({reviews});

      if (!reviews || !Array.isArray(reviews)) {
        const error = "Please enter a review.";
        return User.findById(userId)
          .then((user) => {
            res.render("movies/show", { user, error });
          })
          .catch((err) => {
            console.log(err);
            res.render("error"); // Render an error page or handle the error in an appropriate way
          });
        }

        User.findById(userId)
        .then((user) => {
          user.reviews = user.reviews || [];
          const author = `${user.firstName} ${user.lastName}`
          const newReview = { reviews, author };
         
          user.reviews.unshift(newReview);
          return user.save(); 
        })  
        .then(() => res.redirect(`/${movieId}/show`))
        .catch((err) => {
          console.log(err);
        });
         
       
      }
    }



module.exports = ReviewController;