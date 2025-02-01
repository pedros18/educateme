const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const postController = require("../../controllers/posts/postController");
const postRouter = express.Router();
postRouter.post("/api/v1/posts/create",postController.createPost)

//list posts
postRouter.get('/api/v1/posts',postController.fetchAllPosts);
// Update a Post (PUT)
postRouter.put('/api/v1/posts/:postId',postController.updatePost);

// Get a single post by ID (GET)
postRouter.get('/api/v1/posts/:postId',postController.getPost);

// Delete a Post (DELETE)
postRouter.delete('/api/v1/posts/:postId',postController.deletePost);

//!handiling error 404 not found
app.use((req,res,next)=>{
res.status(404).json({message:"route not found"})
})

module.exports = postRouter;