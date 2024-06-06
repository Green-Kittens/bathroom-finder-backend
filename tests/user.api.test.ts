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

describe("User API Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      Email: "test@test.com",
      PictureURL: "https://example.com/profilepic.jpg",
      DateJoined: new Date(),
      DisplayName: "Test User",
      Favorites: [],
      Reviews: [],
      UserID: "12345",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.username).toBe("TestUser");
  });

  it("should fetch a user by ID", async () => {
    const res = await request(app)
      .get("/users/user_123") // Replace with a valid ID
      .send();
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe(1);
  });

  // Add more tests for other endpoints as needed
});
