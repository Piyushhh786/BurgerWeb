const express = require("express");
const router = express.Router({ mergeParams: true });
const filterController = require("../controller/filter.js");
const wrapAsync = require("../error/wrapAsync.js");

router.route("/").
    get(filterController.renderFilterForm).
    post(wrapAsync(filterController.postFilterForm));


module.exports = { filterRouter: router };