const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");//for includes 
const expressError = require("./error/ExpressError.js");
const { listingRouter, validateListing } = require("./routes/listing.js");
// const { listingSchema } = require("./joiSchema.js");
const { cartRouter } = require("./routes/cart.js");
const { requestRouter } = require("./routes/request.js");
const { filterRouter } = require("./routes/filter.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStrore = require("connect-mongo");
const Listing = require("./models/listing.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const wrapAsync = require("./error/wrapAsync.js");
const { isLoggedin, isAuth } = require("./middleware.js");
const multer = require('multer');
const { storage } = require("./cloudConfig.js");
// const listing = require("./models/listing.js");
const upload = multer({ storage });
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
    console.log(process.env.SECRET);
}



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
let uri = process.env.ATLAS_DBURL;

const store = MongoStrore.create({
    mongoUrl: uri,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});
store.on("error", () => {
    console.log("Error in mongo store session!!");
});
app.use(session({
    store,
    secret: process.env.SECRET,
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
    await mongoose.connect(uri);
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
    //! our form will not send the file to the server so we have to use multer 
    //! if you solved the above problem then how you can save the image in the database and render it in the browser(use cloud storage)
});
app.post("/addList", upload.single('list[image]'), validateListing, wrapAsync(async (req, res, next) => {
    const url = req.file.path;
    const foldername = req.file.filename;
    req.body.list.ingredients = req.body.list.ingredients.split(",").map(e => e.trim());
    const newListing = new Listing(req.body.list);
    newListing.ownerrId = req.user._id;
    newListing.image = { url, foldername };
    await newListing.save();
    //flash msg
    req.flash("success", "Listing Successfully added");
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

