const mongoose = require("mongoose");
const { Schema } = mongoose;
const requestSchema = new Schema({
    isSolved: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
    },
    price: {
        type: Number,
        min: 0,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ingredients: {
        type: [String],
        required: true,
        set: v => v.map(item => ` ${item}`.trim().toUpperCase())

    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});
const Request = mongoose.model("Request", requestSchema);
module.exports = Request;