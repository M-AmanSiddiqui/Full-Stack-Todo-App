import mongoose from "mongoose";

const conn = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mamansiddiqui2024:aman1234@cluster0todo.qy1wtbv.mongodb.net/todolist"
    );
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

conn();
