import request from "supertest";
import app from "../src/index"; // Adjust the path according to your project structure
import { connectDatabase } from "../src/database";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;
beforeAll(async () => {
  await connectDatabase();
  server = app.listen(3000);
});

afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

describe("Review API Endpoints", () => {
  it("should create a new review", async () => {
    const res = await request(app).post("/api/reviews").send({
      userId: 1,
      facilityId: 1,
      rating: 5,
      comment: "Great facility!",
      // other required fields
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.comment).toBe("Great facility!");
  });

  it("should fetch a review by ID", async () => {
    const res = await request(app)
      .get("/api/reviews/1") // Replace with a valid ID
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe(1);
  });

  // Add more tests for other endpoints as needed
});
