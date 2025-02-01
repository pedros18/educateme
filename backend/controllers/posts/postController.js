const expressAsyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

const postController = {
    //create post
    createPost: expressAsyncHandler(async (req, res) => {
        const { title, description } = req.body;
    
        // Check if a post with the same title already exists
        const postFound = await Post.findOne({ title });
        if (postFound) {
          throw new Error("Post already exists");
        }
    
        const newPost = await Post.create({ title, description });
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
    deletePost:expressAsyncHandler(async (req, res) => {
        const postId = req.params.postId;
    
        // Validate if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
          return res.status(400).json({ message: "Invalid post ID" });
        }
    
        const postDeleted = await Post.findByIdAndDelete(postId);
        if (!postDeleted) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        res.json({ status: "success", message: "Post deleted successfully", postDeleted });
    }),
}
module.exports = postController;