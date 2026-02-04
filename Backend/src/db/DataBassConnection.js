import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectingDB = await mongoose.connect(process.env.MONGOODB_URL);
    console.log(`✅ MongoDB Connected: ${connectingDB.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
