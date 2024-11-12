// let originalUrl;
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const Request = require("./models/request.js");
const expressError = require("./error/ExpressError.js");
const isLoggedin = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            console.log(req.path, "..", req.originalUrl);//it will gives where you try to go 
            // originalUrl = req.originalUrl;
            req.session.originalUrl = req.originalUrl;
            req.flash("error", "You must be Logged in first.");
            return res.redirect("/user/login"); // Added return to stop further execution
        }
        // console.log("yeah");
        // next(req, res); // Proceed if authenticated
        next();

    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/user/login"); // Added return to stop further execution
    }
}
const saveUrl = (req, res, next) => {
    if (req.session.originalUrl) {
        res.locals.originalUrl = req.session.originalUrl;
    }
    return next();
}
// const isOwner = async (req, res, next) => {
//     try {
//         if (!req.user || !req.user.isAuth) {
//             return next();
//         } else {
//             const result = await Request.findOne({ ownerId: req.user._id.toString(), isSolved: false });
//             if (result) {
//                 req.flash("Error", "You have a request from customer.");
//             }
//             return next();
//         }

const isAuth = async (req, res, next) => {
    try {
        if (req.user) {
            if (req.user.isAuth) {
                next();
            }
            else {
                throw new expressError("404", "You are not the Authorized Person");
            }
        }
    } catch (e) {
        throw new expressError("404", e.message);
    }
}


//     } catch (e) {
//         throw new expressError(402, e.message);
//     }
// }
const isValidListingUser = async (req, res, next) => {
    try {
        let { itemId } = req.params;
        let list = await Listing.findById(itemId);
        console.log(list.ownerId, "..", req.user._id);
        if (!list.ownerId.equals(req.user._id)) {
            req.flash("error", "You are not the real Owner of this listing!!");
            return res.redirect(`/listings/${itemId}`);
        }
    } catch (e) {
        // res.send(e.message);
        next(e);
    }
}
const isValidReviewUser = async (req, res, next) => {
    try {
        let { r_id, id } = req.params;
        const review = await Review.findById(r_id);
        // console.log(req.user.username, ",,,,,", review.owner);
        if (review.owner != req.user.username) {
            req.flash("error", "You are not owner of this review");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (e) {
        res.send(e.message);
        next();
    }
}
module.exports = { isLoggedin, saveUrl, isValidReviewUser, isValidListingUser, isAuth };
