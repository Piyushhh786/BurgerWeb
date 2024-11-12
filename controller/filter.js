const Listing = require("../models/listing.js");

module.exports.renderFilterForm = (req, res) => {
    res.render("./rest/filter.ejs");
}
module.exports.postFilterForm = async (req, res) => {
    const { minPrice, maxPrice, isAvailable, list, category, minRating, maxRating } = req.body;

    const filter = {};

    // Price filter
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = minPrice;
        if (maxPrice) filter.price.$lte = maxPrice;
    }

    // Availability filter
    if (isAvailable === 'true' || isAvailable === 'false') {
        filter.isAvailable = isAvailable === 'true';
    }

    // Ingredients filter (assuming comma-separated list)
    if (list && list.ingredients) {
        const ingredientsArray = list.ingredients.split(',').map(i => ` ${i}`.trim().toUpperCase());
        filter.ingredients = { $all: ingredientsArray };
    }

    // Category filter
    if (category) {
        filter.category = category;
    }

    // Rating filter
    if (minRating || maxRating) {
        filter.rating = {};
        if (minRating) filter.rating.$gte = minRating;
        if (maxRating) filter.rating.$lte = maxRating;
    }


    const listings = await Listing.find(filter);
    res.render('./listings/filter.ejs', { listings }); // Render a view with the filtered listings

};