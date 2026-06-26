const mongoose = require("mongoose");
const {Schema} =require("mongoose");
const { default: Repository } = require("./repoModel");


const IssueRepo = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["open","closed"],
        default : "open",
    },
    repository : {
        type : Schema.Types.ObjectId,
        ref : "Repository",
        required : true,
    },
}),


// making the model

const  Issue = mongoose.model("Issue", IssueRepo);

module.exports = Issue;
