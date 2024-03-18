import express, { Express, Response, Request } from "express";
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

// Basic route for home page
app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

// Echo function to display request URLs
function echo(req: Request, res: Response) {
  res.send(req.originalUrl);
}

// Additional routes for bathroom finder functionality
app.get("/bathrooms", echo);
app.get("/bathrooms/:bathroomId", echo);
app.post("/bathrooms", echo);
app.get("/bathrooms/:bathroomId/reviews", echo);
app.post("/bathrooms/:bathroomId/reviews", echo);
app.get("/bathrooms/:bathroomId/tags", echo);
app.post("/bathrooms/:bathroomId/tags", echo);

// Starting the server
app.listen(port, () => {
  console.log(`App started successfully on port ${port}`);
});
