require('dotenv').config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post/Post"); // Ensure this model exists
const connectDB = require("./utils/connectDB"); // Ensure this file exists
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json()); 

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Create a Post (POST)
app.post("/api/v1/posts/create", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = new Post({ title, description });
    await newPost.save();
    return res.status(201).json({ message: "Post created successfully", postCreated: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// List All Posts (GET)
app.get('/api/v1/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ status: "success", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Update a Post (PUT)
app.put('/api/v1/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    // Check if `postId` is a valid ObjectId
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
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
//get post 
app.get('/api/v1/posts/:postId',async (req,res)=>{
  try {
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);
    res.json({status:'success', message: "Post fetched successfully", postFound });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  
  }
})
//delete post
app.delete('/api/v1/posts/:postId',async (req,res)=>{
  try {
    const postId = req.params.postId;
    const postFound = await Post.findByIdAndDelete(postId);
    res.json({status:"sucess", message: "Post deleted successfully", postFound });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  
  }
})
// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
