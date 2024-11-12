const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");//for includes 
const expressError = require("./error/ExpressError.js");
const { listingRouter, validateListing } = require("./routes/listing.js");
const { listingSchema } = require("./joiSchema.js");
const { cartRouter } = require("./routes/cart.js");
const { requestRouter } = require("./routes/request.js");
const { filterRouter } = require("./routes/filter.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const Listing = require("./models/listing.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const wrapAsync = require("./error/wrapAsync.js");
const { isLoggedin, isAuth } = require("./middleware.js");


// ----------x---------

//*----------method-override----------------
app.use(methodOverride("_method"));

//*----------basic setup----------------
app.engine('ejs', ejsMate);

// const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*----------session setup----------------
app.use(session({
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true //! it will prevent us from cross scripting attacks
    }
}));
//* -------------flash-------------
app.use(flash());



//*----------passport----------------
app.use(passport.initialize());//initializing passport for all the request
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(`${req.user} hello`);
    next();
});
main().then(() => {
    console.log("successfully connected with mongodb");
}).catch((err) => {
    console.log(err.message);
    // next(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/burger');
}

app.listen(port, () => {
    console.log("Our server is listening on 8080 port.");

});

app.get("/", wrapAsync(async (req, res, next) => {
    // console.log(req.user);
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
}));
app.get("/addList", isLoggedin, isAuth, (req, res) => {
    // console.log(req.user);   
    res.render("./listings/add.ejs", { currentPage: 'addList' });
});
app.post("/addList", isLoggedin, isAuth, validateListing, wrapAsync(async (req, res) => {
    let list = req.body.list;
    console.log(list);
    console.log(req.user._id);
    list.ownerId = req.user._id,
        listingSchema.validate(list);
    let listing = new Listing(list);
    await listing.save();
    //flash msg
    req.flash("ListAdded", "Listing Successfully added");
    res.redirect("/");
}));
app.use("/aboutUs", (req, res) => {
    res.render("./rest/about.ejs");
});


//*---------- filter-----------
app.use("/filter", filterRouter);


//*---------- request Router-----------
app.use("/userRequests", requestRouter);


//*---------- listings-----------


app.use("/listing/:itemId", listingRouter);

// *----------Reviews-----------

// app.use("/listings/:id/review", reviews);

//*----------login and signup-----------

app.use("/user", userRouter);

//*----------cart-----------
app.use("/cart", cartRouter);

//*----------Error Handling-----------
app.all("*", (req, res, next) => {
    let status = 404;
    let message = "Page not Found!!";
    throw new expressError(status, message);
});

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;
    console.log(status, message);
    return res.status(status).render("listings/error.ejs", { message });
});

