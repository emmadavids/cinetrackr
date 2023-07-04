const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First name is required"],
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	}, })

    const User = mongoose.model("User", UserSchema);

    // Seed data
    
    User.collection.drop();

    const usersData = [
        {
            firstName: "Test",
            lastName: "Test",
            email: "test@test.com",
            password: "password123", // Testtest1
        },
    ];
    
    User.insertMany(usersData, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Users added successfully!");
        }
    });
    
module.exports = User;