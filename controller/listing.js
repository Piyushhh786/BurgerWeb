const Listing = require("../models/listing");
const User = require("../models/user.js");
const Request = require("../models/request.js");

module.exports.showListing = async (req, res, next) => {
    const { itemId } = req.params;
    const list = await Listing.findById(itemId);
    // console.log(list);
    // console.log(itemId);

    res.render("./listings/individual.ejs", { list });
};

module.exports.destroyListing = async (req, res, next) => {
    let { itemId } = req.params;
    console.log("Deletion ", itemId);
    let result = await Listing.findByIdAndDelete(itemId);
    console.log(result);
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/");

};
module.exports.editListing = async (req, res, next) => {
    try {
        let { itemId } = req.params;
        console.log(itemId);
        let list = req.body.list;
        const url = req.file.path;
        const foldername = req.file.filename;
        list.image = { url, foldername };
        console.log(list);
        await Listing.findByIdAndUpdate(itemId, { ...list });
        req.flash("success", "Listing Updated Successfully");
        res.redirect(`/listing/${itemId}`);
    } catch (e) {
        throw new expressError(400, e.message);
    }
};
module.exports.renderEditForm = async (req, res) => {
    let { itemId } = req.params;
    const list = await Listing.findById(itemId);

    res.render("./listings/edit.ejs", { list });
};
module.exports.PostAddCart = async (req, res, next) => {
    let { itemId } = req.params;
    const list = await Listing.findById(itemId);
    if (!list) {
        // If the item is not found, send a 404 error response
        return res.status(404).render("listings/error.ejs", { message: "Item not found" });
    }
    // console.log(req.user);
    req.user.carts.push(list);
    await req.user.save();
    req.flash("success", "Item Added to Cart");
    // console.log(req.user.carts);
    res.redirect("/");
    // next();


};

module.exports.getAddCart = async (req, res) => {
    let { itemId } = req.params;
    const list = await Listing.findById(itemId);
    if (!list) {
        // If the item is not found, send a 404 error response
        return res.status(404).render("listings/error.ejs", { message: "Item not found" });
    }
    // console.log(req.user);
    req.user.carts.push(list);
    await req.user.save();
    req.flash("success", "Item Added to Cart");
    // console.log(req.user.carts);
    res.redirect("/");
};

module.exports.customization = async (req, res) => {
    const { itemId, ownerId } = req.params;
    let { ingredients } = req.body;
    ingredients = ingredients.split(",").map(item => ` ${item}`.trim().toUpperCase());
    const customerId = req.user._id;
    const request = new Request({
        ownerId: ownerId,
        ingredients: ingredients,
        customerId: customerId
    });
    console.log(request);
    const result = await request.save();
    console.log(result);
    await req.user.requests.push(result._id);
    await req.user.save();
    const owner = await User.findOne({ _id: ownerId });
    await owner.requests.push(result._id);
    req.flash("success", "Your request is successfully sent to the Owner.");
    res.redirect(`/listing/${itemId}`);
};