const mongoose = require("mongoose");
// const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    ingredients: {
        type: [String],
        required: true,
        set: v => v.map(item => ` ${item}`.trim().toUpperCase())

    },
    category: {
        type: String,
        enum: ["beef", "chicken", "vegetarian", "vegan", "coldDrink", "userRequest"],
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 5
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
    },
    // imageUrl: {
    //     type: String,
    //     default: "https://media.istockphoto.com/id/1206323282/photo/juicy-hamburger-on-white-background.jpg?s=612x612&w=0&k=20&c=K0DxyiChLwewXcCy8aLjjOqkc8QXPgQMAW-vwRCzqG4=",
    //     validate: {
    //         validator: function (v) {
    //             return /^https?:\/\/.+/.test(v); // Checks for a valid URL format
    //         },
    //         message: props => `${props.value} is not a valid URL!`
    //     }
    // },
    image: {
        url: {
            type: String,
            default: "https://media.istockphoto.com/id/1206323282/photo/juicy-hamburger-on-white-background.jpg?s=612x612&w=0&k=20&c=K0DxyiChLwewXcCy8aLjjOqkc8QXPgQMAW-vwRCzqG4=",
        },
        foldername: {
            type: String,
        },
    },
    description: {
        type: String,
        default: "A burger",
        required: true,
        maxlength: 500
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = mongoose.model('Listing', listingSchema);
