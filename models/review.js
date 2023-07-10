const mongoose = require("mongoose");


const ReviewSchema = new mongoose.Schema({
	movie_id: {
		type: Integer,
		
	},
	review: {
		type: String,
		required: [true, "Email is required"],
	},
	
})
