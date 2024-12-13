const Joi = require('joi');

// const reviewSchema = Joi.object({
//     review: Joi.object({

//         rating: Joi.number().min(1).max(5).required(),
//         comment: Joi.string().required(),
//         owner: Joi.string(),
//     }).required(),

// });
const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
const listingSchema = Joi.object({
    title: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string()
        .valid("beef", "chicken", "vegetarian", "vegan", "coldDrink")
        .required(),
    isAvailable: Joi.boolean().default(true),
    // quantity: Joi.number().min(0).default(0),
    rating: Joi.number().min(0).max(5).default(0),
    image: Joi.object({
        url: Joi.string().uri().required(),
        foldername: Joi.string(),
    }).required(),
    description: Joi.string().max(500).required(),
}).unknown(true); // Allow additional fields


module.exports = { listingSchema, userSchema };