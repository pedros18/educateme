const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        //Post content
        description: { type: String, required: true,trim: true,},
        image:{
            type: Object,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        nextEarningDate: {
            type: Date,
            default: ()=> new Date(new Date().getFullYear(), new Date().getMonth()+1,1),
            // Default to the first day of the next month
        },
        thisMonthEarnings: { type : Number, default: 0},
        totalEarnings: {type: Number, default: 0},
        category: {type:mongoose.Schema.Types.ObjectId,ref: "Category"},
        viewsCount: {type: Number, default:0},
        //interactions
        likes: [{ type: mongoose.Schema.Types.ObjectId,ref: "User"}],
        dislikes: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
        viewers: [{ type: mongoose.Schema.Types.ObjectId,ref: "User"}],
        // comments
        comments: [{type: mongoose.Schema.Types.ObjectId,ref: "Comment"}],
        isBlocked: { type: Boolean, default: false},
    },
    { timestamps:true}
);
//model
const Post = mongoose.model("post", postSchema);
module.exports = Post;