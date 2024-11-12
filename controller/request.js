const Request = require("../models/request.js");
const Listing = require("../models/listing.js");


module.exports.renderRequest = async (req, res) => {
    const requests = await Request.find({
        $or: [{ ownerId: req.user._id }, { customerId: req.user._id }]
    });
    res.render("./rest/request.ejs", { requests });
}
module.exports.acceptRequest = async (req, res) => {
    const { requestId } = req.params;
    const { price } = req.body;
    const request = await Request.findByIdAndUpdate(requestId, { $set: { isSolved: 1, price: price } });
    res.redirect("/userRequests");

};
module.exports.declineRequest = async (req, res) => {
    const { requestId } = req.params;
    const { price } = req.body;
    const updatedReq = await Request.findByIdAndUpdate(requestId, { $set: { isSolved: 2, price: price } });
    console.log(updatedReq);
    res.redirect("/userRequests");
};
module.exports.addToCartRequest = async (req, res) => {
    let { requestId } = req.params;
    const request = await Request.findById(requestId);
    if (!request) {
        // If the item is not found, send a 404 error response
        return res.status(404).render("listings/error.ejs", { message: "Item not found" });
    }
    const list = new Listing({
        title: "For User Request",
        price: request.price,
        ingredients: request.ingredients,
        category: "userRequest",
        ownerId: req.user._id,
    });
    await list.save();
    // console.log(req.user);
    req.user.carts.push(list);
    await req.user.save();
    req.flash("success", "Item Added to Cart");
    // console.log(req.user.carts);
    res.redirect("/userRequests");

};