const express = require("express");
const router = express.Router({ mergeParams: true });
const { listingSchema } = require("../joiSchema.js");
const wrapAsync = require("../error/wrapAsync.js");
const expressError = require("../error/ExpressError.js");
const { isLoggedin, isAuth } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
// const listing = require("./models/listing.js");
const upload = multer({ storage });
const listingController = require("../controller/listing.js");
// const axios = require("axios");


//validate middleware by joi
const validateListing = (req, res, next) => {
    // req.body.list.ingredients = req.body.list.ingredients.split(",").map(item => item.trim()).filter(item => item !== "");

    if (req.body.list.isAvailable === 'on') {
        req.body.list.isAvailable = true;
    } else {
        req.body.list.isAvailable = false;
    }
    console.log(req.body.list);

    try {
        listingSchema.validate(req.body.list);

    } catch (error) {
        // let errMsgs = error.details.map((el) => el.message).join(",");
        throw new expressError(400, error);
    }
    next();
}



//* -------------------- Normal CRUD operations on Listing --------------------------
router.get("/", wrapAsync(listingController.showListing));

router.delete("/delete", isLoggedin, isAuth, wrapAsync(listingController.destroyListing));

//* --------------- Edit listing ------------------

router.route("/edit")
    .put(isLoggedin, upload.single('list[image]'), validateListing, wrapAsync(listingController.editListing))
    .get(isLoggedin, wrapAsync(listingController.renderEditForm));



//* --------------- add to cart ------------------

router.route("/addCart").
    get(isLoggedin, wrapAsync(listingController.getAddCart)).
    post(isLoggedin, wrapAsync(listingController.PostAddCart));


//* --------------- Customization ------------------
router.post("/:ownerId/customization", isLoggedin, wrapAsync(listingController.customization));


module.exports = { listingRouter: router, validateListing }