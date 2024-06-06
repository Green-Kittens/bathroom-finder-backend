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

describe("Facility API Endpoints", () => {
  it("should create a new facility", async () => {
    const res = await request(app)
      .post("/facilities")
      .send({
        Name: "Facility Test",
        Category: "General",
        Tags: "Clean, Spacious",
        Operations: "9am-5pm",
        Reviews: [],
        Date: new Date(),
        PictureURL: [
          "https://example.com/facility.jpg",
          "https://example.com/facility2.jpg",
        ],
        RatingAVG: 4.5,
        Favorites: 0,
        Reports: 0,
        coordinates: [1.2345, 6.789],
        Description: "Good bathroom overall.!",
        UserID: "12345",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test Facility");
  });

  it("should fetch a facility by ID", async () => {
    const res = await request(app)
      .get("/facilities/65e3c7599aa3eada64c4c737") // Replace with a valid ID
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe(1);
  });

  // Add more tests for other endpoints as needed
});
