const mongoose = require("mongoose")

const commentSchema = new nomgoose.Schema(
    {
        content:{
            type: String,
            required: true,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required: true,
        }
    },
    {
     timestamps: true 
    }
);
//model
const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;