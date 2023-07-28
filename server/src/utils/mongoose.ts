import mongoose from "mongoose"
import config from "../config"

const connectDatabase = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.yxeehec.mongodb.net/${config.MONGO_DATABASE}`,
    );
    console.log("Database connected to:", db.connection.name);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDatabase();