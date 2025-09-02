import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Local development ke liye env load karo
dotenv.config();

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default conn;
