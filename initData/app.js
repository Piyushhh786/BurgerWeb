const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./init");
main().catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/burger");
}
const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}
initDB();