const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.error("MongoDB connection error:", err));
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
