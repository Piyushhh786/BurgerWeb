// const { required, date, string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,

    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    owner: {
        type: String,
        required: true,
        default: "bot"

    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;