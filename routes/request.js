const express = require("express");
const router = express.Router({ mergeParams: true });
const Request = require("../models/request.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../error/wrapAsync.js");
const { isLoggedin } = require("../middleware.js");
const requestController = require("../controller/request.js");
router.get("/", isLoggedin, wrapAsync(requestController.renderRequest));

router.post("/:requestId/accept", isLoggedin, wrapAsync(requestController.acceptRequest));


router.post("/:requestId/decline", isLoggedin, wrapAsync(requestController.declineRequest));
router.post("/:requestId/addCart", isLoggedin, wrapAsync(requestController.addToCartRequest));

module.exports = { requestRouter: router };
