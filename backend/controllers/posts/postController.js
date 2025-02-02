const mongoose = require("mongoose"); // ✅ Fix: Import mongoose
const expressAsyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

const postController = {
    //create post
    createPost: expressAsyncHandler(async (req, res) => {
        const { description } = req.body;
    
        const newPost = await Post.create({ description });
        res.json({ status: "success", message: "Post created successfully", postCreated: newPost });
    }),
    //list all posts
    fetchAllPosts:expressAsyncHandler(async (req, res) => {
        const posts = await Post.find();
        res.status(200).json({ status: "success",message:"post fetched successfully", posts });
    }),
    //get a post
    getPost:expressAsyncHandler(async (req, res) => {
        const postId = req.params.postId;
    
        // Validate if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
          return res.status(400).json({ message: "Invalid post ID" });
        }
    
        const postFound = await Post.findById(postId);
        if (!postFound) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        res.json({ status: "success", message: "Post fetched successfully", postFound });
    }),
    //update a post
    updatePost: expressAsyncHandler(async (req, res) => {
        const { postId } = req.params;
    
        // Validate if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
          return res.status(400).json({ message: "Invalid post ID" });
        }
    
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title: req.body.title, description: req.body.description },
          { new: true, runValidators: true }
        );
    
        if (!updatedPost) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        res.json({ message: "Post updated successfully", updatedPost });
    }),
    //delete post
    deletePost: expressAsyncHandler(async (req, res) => {
        const { postId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ status: "error", message: "Invalid post ID" });
        }
        const postDeleted = await Post.findByIdAndDelete(postId);
        if (!postDeleted) {
            return res.status(404).json({ status: "error", message: "Post not found" });
        }
        res.json({ status: "success", message: "Post deleted successfully", postId });
    }),
}
module.exports = postController;