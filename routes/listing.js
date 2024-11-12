const express = require("express");
const router = express.Router({ mergeParams: true });
const { listingSchema } = require("../joiSchema.js");
const wrapAsync = require("../error/wrapAsync.js");
const expressError = require("../error/ExpressError.js");
const { isLoggedin } = require("../middleware.js");
const listingController = require("../controller/listing.js");
// const axios = require("axios");


//validate middleware by joi
const validateListing = (req, res, next) => {
    // console.log(req.body);
    console.log(req.body.list.ingredients);
    req.body.list.ingredients = req.body.list.ingredients.split(",").map(item => item.trim());
    // console.log(req.body.list.ingredients);
    if (req.body.list.isAvailable === 'on') {
        req.body.list.isAvailable = true;
    } else {
        req.body.list.isAvailable = false;
    }
    // console.log(req.body.list);
    let { error } = listingSchema.validate(req.body.list);
    if (error) {
        let errMsgs = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsgs);
    }
    else next();
}


//* -------------------- Normal CRUD operations on Listing --------------------------
router.get("/", wrapAsync(listingController.showListing));

router.delete("/delete", isLoggedin, wrapAsync(listingController.destroyListing));

router.put("/edit", isLoggedin, validateListing, wrapAsync(listingController.editListing));

router.get("/edit", isLoggedin, wrapAsync(listingController.renderEditForm));

//* --------------- add to cart ------------------
router.post("/addCart", isLoggedin, wrapAsync(listingController.PostAddCart));
router.get("/addCart", isLoggedin, wrapAsync(listingController.getAddCart));

//* --------------- Customization ------------------
router.post("/:ownerId/customization", isLoggedin, wrapAsync(listingController.customization));


module.exports = { listingRouter: router, validateListing }