import express from "express";
import { config } from "./config.js";
import { connectDatabase } from "./database.js";
import userRoutes from "./routes/user.routes.js"; // Adjust path as necessary
import facilityRoutes from "./routes/facility.routes.js"; // Adjust path as necessary
import reviewRoutes from "./routes/review.routes.js"; // Adjust path as necessary

// Express app setup
const app = express();
app.use(express.json());
connectDatabase();

// Use the routes with their base paths
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
app.use("/facilities", facilityRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

export default app;
