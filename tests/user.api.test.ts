import request from "supertest";
import app from "../src/index"; // Adjust the path according to your project structure
import { connectDatabase } from "../src/database";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;
const createdUsers: string[] = []; // Explicitly type the array

beforeAll(async () => {
  await connectDatabase();
  server = app.listen(3000);
});

afterAll(async () => {
  for (const userID of createdUsers) {
    await request(app).delete(`/users/${userID}`);
  }
  await server.close();
  await mongoose.connection.close();
});

describe("User API Endpoints", () => {
  it("should create a new user", async () => {
    const userPayload = {
      Email: "testuser1@test.com",
      PictureURL: "https://example.com/profilepic.jpg",
      DateJoined: new Date(),
      DisplayName: "Test User",
      Favorites: [],
      Reviews: [],
      UserID: "12345",
    };

    const res = await request(app).post("/users").send(userPayload);

    console.log("Create User Response Body:", res.body); // Log response body for debugging

    createdUsers.push(res.body.UserID); // Track created user

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id"); // Use _id for MongoDB generated ID
    expect(res.body.DisplayName).toBe("Test User");
  });

  it("should fetch a user by UserID", async () => {
    // Create a user via the API
    const createRes = await request(app).post("/users").send({
      Email: "testuser2@test.com",
      PictureURL: "https://example.com/profilepic.jpg",
      DateJoined: new Date(),
      DisplayName: "Test User",
      Favorites: [],
      Reviews: [],
      UserID: "54321",
    });

    createdUsers.push(createRes.body.UserID); // Track created user

    // Fetch the user by UserID
    const res = await request(app)
      .get("/users/54321") // Fetch using the UserID
      .send();

    console.log("Fetch User Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(200); // Expect 200 OK
    expect(res.body).toHaveProperty("_id");
    expect(res.body.UserID).toBe("54321");
  });

  it("should update a user by UserID", async () => {
    const updatePayload = {
      Email: "updateduser@test.com",
      DisplayName: "Updated User",
    };

    const createRes = await request(app).post("/users").send({
      Email: "testuser3@test.com",
      PictureURL: "https://example.com/profilepic.jpg",
      DateJoined: new Date(),
      DisplayName: "Test User",
      Favorites: [],
      Reviews: [],
      UserID: "67890",
    });

    createdUsers.push(createRes.body.UserID); // Track created user

    const res = await request(app).put("/users/67890").send(updatePayload);

    console.log("Update User Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(200);
    expect(res.body.Email).toBe("updateduser@test.com");
    expect(res.body.DisplayName).toBe("Updated User");
  });

  it("should delete a user by UserID", async () => {
    const createRes = await request(app).post("/users").send({
      Email: "testuser4@test.com",
      PictureURL: "https://example.com/profilepic.jpg",
      DateJoined: new Date(),
      DisplayName: "Test User",
      Favorites: [],
      Reviews: [],
      UserID: "09876",
    });

    const res = await request(app).delete("/users/09876");

    console.log("Delete User Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.UserID).toBe("09876");

    // Verify deletion
    const fetchRes = await request(app).get("/users/09876");
    expect(fetchRes.statusCode).toEqual(404);
  });

  // New test case for duplicate email
  it("should return 400 for duplicate email", async () => {
    const userPayload = {
      Email: "duplicate@test.com",
      PictureURL: "https://example.com/profilepic.jpg",
      DateJoined: new Date(),
      DisplayName: "Duplicate User",
      Favorites: [],
      Reviews: [],
      UserID: "duplicate1",
    };

    // Create the first user
    const firstRes = await request(app).post("/users").send(userPayload);
    createdUsers.push(firstRes.body.UserID);

    // Attempt to create a second user with the same email
    const secondRes = await request(app).post("/users").send(userPayload);

    console.log("Duplicate User Response Body:", secondRes.body); // Log response body for debugging

    expect(secondRes.statusCode).toEqual(400);
    expect(secondRes.body).toHaveProperty("errors");
  });

  // New test case for invalid input
  it("should return 400 for invalid input", async () => {
    const invalidPayload = {
      Email: "invalidemail", // Invalid email format
      PictureURL: "https://example.com/profilepic.jpg",
      DateJoined: new Date(),
      DisplayName: "Invalid User",
      Favorites: [],
      Reviews: [],
      UserID: "invalid1",
    };

    const res = await request(app).post("/users").send(invalidPayload);

    console.log("Invalid Input Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });

  // Additional test cases for error handling

  it("should return 404 for non-existent user when updating", async () => {
    const updatePayload = {
      Email: "nonexistent@test.com",
      DisplayName: "Non-existent User",
    };

    const res = await request(app)
      .put("/users/nonexistent")
      .send(updatePayload);

    console.log("Update Non-existent User Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(404);
  });

  it("should return 404 for non-existent user when deleting", async () => {
    const res = await request(app).delete("/users/nonexistent");

    console.log("Delete Non-existent User Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(404);
  });

  it("should return 404 for non-existent user when fetching by UserID", async () => {
    const res = await request(app).get("/users/nonexistent");

    console.log("Fetch Non-existent User Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(404);
  });

  // Add more tests for other endpoints as needed
});