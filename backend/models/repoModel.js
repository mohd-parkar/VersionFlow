const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const RepoSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
    },
    content : [
        {
            type : String,
        },
    ],
    visibility : {
        type : String,
    },
    // we get repo owner from the User Model
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    // now the issues will get from issues model and they are list []
    issues : [
        {
            type : Schema.Types.ObjectId,
            ref : "Issue",
        },
    ],
});

// making the model from the schema

const Repository = mongoose.model("Repository",RepoSchema);

module.exports = Repository;