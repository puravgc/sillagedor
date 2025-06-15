import mongoose from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return; // already connected
  }

  const uri = process.env.MONGODB_URI ?? "";
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(uri, {
      // Optional: add config here
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;
