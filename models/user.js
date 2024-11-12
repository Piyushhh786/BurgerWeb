// const { required } = require("joi");
// const { required } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({ // in this we do not requried to add uername and password due t passportLocalMongoose
    email: {
        type: String,
        required: true,
    },
    isAuth: {
        type: Boolean,
        default: false,
        required: true,

    },
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId, // Or String if you prefer
            ref: 'Request',
        },
    ],
    carts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing",
        }
    ],
});


userSchema.plugin(passportLocalMongoose);
//using of passportlocalmongoose now we dont want to require username hasing salting in passward
// it will also aadd some addintional methods setpassword ,aunticate(password),authenticate() ,serializer(),deserializer()
// userSchema.pre('save', function (next) {
//     if (!this.isAuth && this.requests && this.requests.length > 0) {
//         return next(new Error("requests can only be set if isAuth is true"));
//     }
//     next();
// });
const User = mongoose.model("User", userSchema);
module.exports = User;