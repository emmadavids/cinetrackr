const User = require("./models/user");
let mongoose = require("mongoose");

/**
 * Connect to MongoDB
 **/

require("dotenv").config();

let mongoDbUrl = process.env.MONGODB_URL || "mongodb://0.0.0.0/cinetrackr";
mongoose.connect(mongoDbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));



//Users to be seeded

const usersData = [
    {
        firstName: "Test",
        lastName: "Test",
        email: "test@test.com",
        password: "$2b$10$AN02NTa8hg.1uz8ffYAIEO.KOF7LWX.yHsOcgSmCmafqNBIN0xDaK", // password1
    },
    
];

// Delete existing data and insert the Users above
User.deleteMany({}, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Existing data deleted successfully!");
      // Insert new data
      User.insertMany(usersData, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Users added successfully!");
        }
        process.exit();
      });
    }
  });

