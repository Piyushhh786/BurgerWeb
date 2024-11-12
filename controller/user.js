const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    console.log(req.user);
    res.render("./SignupIn/signup.ejs", { currentPage: 'signup/login' });
};
module.exports.postSignupForm = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const exist = await User.findOne({ email: email });
        if (exist) {
            req.flash("error", "Email existed, Please use different email.");
            return res.redirect("/user/signup");
        }
        const temp = new User({
            username: username,
            email: email,
        });

        let result = await User.register(temp, password);
        req.login(result, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User registered Successfully");
            // res.send(result);
            // console.log(result);
            res.redirect("/");
        });


    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/user/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {

    res.render("./SignupIn/login.ejs", { currentPage: 'signup/login' });
};
module.exports.postLoginForm = async (req, res, next) => {
    req.flash("success", "Welcome to Burgerr.");
    // console.log(res.locals.originalUrl); //! passport will reset all the session so first restore it
    if (res.locals.originalUrl) {
        res.redirect(res.locals.originalUrl);
    } else {
        // console.log("xyz");
        res.redirect("/");
    }
};
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/");

    });
}