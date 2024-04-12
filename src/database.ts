import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Could not connect to MongoDB Atlas:", err);
    process.exit(1);
  }
};