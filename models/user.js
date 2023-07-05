const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
	}, 
    watch_list: {
        type:[String],
        default:[],
    },
    already_watched: {
        type:[String],
        default:[],
    }
})

    UserSchema.pre("save", function (next) {
        const user = this;
    
        if (this.isModified("password") || this.isNew) {
            bcrypt
                .genSalt(saltRounds)
                .then((salt) => {
                    console.log("Salt: ", salt);
                    return bcrypt.hash(user.password, salt);
                })
                .then((hash) => {
                    console.log("Hash: ", hash);
                    user.password = hash;
                    next();
                })
                .catch((err) => console.error(err.message));
        } else {
            return next();
        }
    });
    

    // const User = mongoose.model("User", UserSchema);

    // Seed data
    
    // User.collection.drop();

    // const usersData = [
    //     {
    //         firstName: "Test",
    //         lastName: "Test",
    //         email: "test@test.com",
    //         password: "password123", // Testtest1
    //     },
    // ];
    
    // User.insertMany(usersData, (error) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("Users added successfully!");
    //     }
    // });
    
// module.exports = User;

module.exports = mongoose.model("User", UserSchema);