const express = require("express");
const router = express.Router();
const { userSchema } = require("../joiSchema.js");

const wrapAsync = require("../error/wrapAsync.js");
const expressError = require("../error/ExpressError.js");
const passport = require("passport");
const { saveUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

const validateUser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if (error) {
        let errMsgs = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsgs);
    }
    else next();
}

//* -----------signup route------------------

router.get("/signup", userController.renderSignupForm);
router.post("/signup", validateUser, wrapAsync(userController.postSignupForm));

//* -----------Login route------------------

router.get("/login", userController.renderLoginForm);
router.post("/login",
    saveUrl,
    passport.authenticate("local", {
        failureRedirect: "/user/login",
        failureFlash: true
    }),
    wrapAsync(userController.postLoginForm),
);

//* ------------- Logout Route -------------------
router.get("/logout", userController.logout);
module.exports = router;
