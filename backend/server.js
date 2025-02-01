require('dotenv').config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./utils/connectDB"); // Ensure this file exists
const postRouter = require('./router/post/postsRouter');
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
//for router 
app.use("/",postRouter);
//for error 404
app.use((res,req,next)=>{
  res.status(404).json({message:"Route not found"})
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  const message = err.message;
  const stack = process.env.NODE_ENV === 'development' ? err.stack : null;
  res.status(500).json({
    message,
    stack,
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
