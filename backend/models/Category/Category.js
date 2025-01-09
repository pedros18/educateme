//schema

const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema(
    {
        categoryName: { type: String,require:true},
        description: { type: String},
            posts: [{ type: mongoose.Schema.Types.ObjectId, ref:"Post"}],
            author: { type:mongoose.Schema.Types.ObjectId, ref:"User"}},
    {
timestamps: true,
    }
);
//model
const Category = mongoose.model("category", categorySchema);
module.exports = Category;