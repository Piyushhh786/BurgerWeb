const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.index = async (req, res, next) => {
    const user = await req.user.populate("carts");
    const carts = user.carts;
    // console.log(carts);
    res.render("./rest/cart.ejs", { currentPage: 'cart', carts });
}

module.exports.destroy = async (req, res, next) => {
    const { id } = req.params;

    const userId = req.user._id;
    const list = await Listing.findById(id);
    console.log(userId);
    const user = await User.findOneAndUpdate(
        { _id: userId },  // Match the user by ID
        {
            $pull: {
                carts: { $eq: id }  // Use the $eq operator to match the cartId exactly
            }
        },
        { new: true }  // Return the updated document
    );
    console.log(user);
    req.flash("success", `${list.title} is removed from cart.`);
    res.redirect("/cart");

};