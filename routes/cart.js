const express = require("express");
const router = express.Router({ mergeParams: true });
// const { listingSchema } = require("../joiSchema.js");
const wrapAsync = require("../error/wrapAsync.js");
const { isLoggedin } = require("../middleware.js");
const cartController = require("../controller/cart.js");

//* ------------- index page of cart ------------------------
router.get("/", isLoggedin, wrapAsync(cartController.index));
//* -------------- Delete Cart ----------------------------------
router.delete("/:id/delete", isLoggedin, wrapAsync(cartController.destroy));

module.exports = { cartRouter: router };