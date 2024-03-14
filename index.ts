import express, { Express, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";


require("dotenv").config();

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

const databaseUrl = process.env.DATABASE_URL || ""; // Ensure DATABASE_URL is defined
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
