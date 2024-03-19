import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import facilityRoutes from "./routes/facility.routes.js";
import userRoutes from "./routes/user.routes.js";
import reviewRoutes from "./routes/review.routes.js";

// Initialize configuration from .env file
dotenv.config();

// Express app setup
const app: Express = express();
const port = process.env.PORT || 3000; // Server port

app.use(express.json());

// Database connection
const databaseUrl = process.env.DATABASE_URL || ""; // Ensure DATABASE_URL is defined
mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas", err));

// Use the routes with their base paths
app.use("/User", userRoutes);
app.use("/Review", reviewRoutes);
app.use("/Facility", facilityRoutes);
// Starting the server
app.listen(port, () => {
  console.log(`App started successfully on port ${port}`);
});
