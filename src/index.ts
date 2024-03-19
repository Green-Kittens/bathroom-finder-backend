import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

// Initialize configuration from .env file
dotenv.config();

// Express app setup
const app: Express = express();
const port = process.env.PORT || 3000; // Server port

// Database connection
const databaseUrl = process.env.DATABASE_URL || ""; // Ensure DATABASE_URL is defined
mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas", err));

// Additional routes for bathroom finder functionality
app.get("/bathrooms");
app.get("/bathrooms/:bathroomId");
app.post("/bathrooms");
app.get("/bathrooms/:bathroomId/reviews");
app.post("/bathrooms/:bathroomId/reviews");
app.get("/bathrooms/:bathroomId/tags");
app.post("/bathrooms/:bathroomId/tags");

// Starting the server
app.listen(port, () => {
  console.log(`App started successfully on port ${port}`);
});
