require('dotenv').config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post/Post"); // Make sure to import the Post model
const connectDB = require("./utils/connectDB"); // Make sure this file exists
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json()); 
//cors 
const corsOptions={origin:['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions))
// Connect to MongoDB
connectDB();

// Route to create a post
app.post('/api/v1/posts/create', async (req, res) => {
  try {
    const postData = req.body;
    // Validate the data
    if (!postData.title || !postData.description || !postData.author || !postData.category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the post in MongoDB
    const postCreated = await Post.create(postData);
    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Route to list all posts (GET)
app.get('/api/v1/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Get all posts
    res.status(200).json({ status: "success", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
