const express = require("express");
const router = express.Router({ mergeParams: true });
const filterController = require("../controller/filter.js");
const wrapAsync = require("../error/wrapAsync.js");


router.get("/", wrapAsync(filterController.renderFilterForm));

router.post('/', wrapAsync(filterController.postFilterForm));

module.exports = { filterRouter: router };