const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const { required } = require("yargs");

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
    },
    // this list will come from the Repository collection/ model (we will link aka Schema Relation)
    repositories : [
        {
            type : Schema.Types.ObjectId,
            ref : "Repository",
            default : [], // empty
        },
    ],
    // again the list of star repo will come from repo model
    starrepo : [
        {
            type : Schema.Types.ObjectId,
            ref : "Repository",
            default : [], // or empty
        },
    ],
});

// Making the Model from Schema

const User = mongoose.mondel("User", UserSchema);

module.exports = User;