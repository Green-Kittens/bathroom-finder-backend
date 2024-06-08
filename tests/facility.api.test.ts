import request from "supertest";
import app from "../src/index";
import { connectDatabase } from "../src/database";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;
const createdFacilities: string[] = [];
const facilityPayload = {
  Name: "Test Facility",
  Category: "General",
  Tags: ["Clean", "Spacious"],
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
  Coordinates: [],
  Description: "Good bathroom overall!",
  UserID: "12345",
};

beforeAll(async () => {
  await connectDatabase();
  server = app.listen(3000);
});

afterAll(async () => {
  for (const facilityID of createdFacilities) {
    await request(app).delete(`/facilities/${facilityID}`);
  }
  await server.close();
  await mongoose.connection.close();
});

describe("Facility API Endpoints", () => {
  it("should create a new facility", async () => {
    const res = await request(app).post("/facilities").send(facilityPayload);

    createdFacilities.push(res.body._id);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.Name).toBe("Test Facility");
  });

  it("should fetch a facility by ID", async () => {
    // Create a facility via the API
    const createRes = await request(app)
      .post("/facilities")
      .send(facilityPayload);

    const facilityID = createRes.body._id;

    createdFacilities.push(facilityID);

    // Fetch the facility by ID
    const res = await request(app)
      .get(`/facilities/${facilityID}`) // Fetch using the facility ID
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body._id).toBe(facilityID);
  });

  it("should return 404 for non-existent facility ID", async () => {
    const res = await request(app).get("/facilities/invalid_id");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toBe("Bathroom not found");
  });

  it("should return 404 when fetching tags for non-existent facility ID", async () => {
    const res = await request(app).get("/facilities/invalid_id/tags");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toBe("Facility not found");
  });

  it("should update tags for a facility by ID", async () => {
    // Create a facility via the API
    const createRes = await request(app)
      .post("/facilities")
      .send(facilityPayload);

    const facilityID = createRes.body._id;

    createdFacilities.push(facilityID);

    // Update tags for the facility by ID
    const res = await request(app)
      .put(`/facilities/${facilityID}/tags`)
      .send({ tags: ["Updated", "Tags"] });

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(["Updated", "Tags"]);
  });

  it("should return 404 when updating tags for non-existent facility ID", async () => {
    const res = await request(app)
      .put("/facilities/invalid_id/tags")
      .send({ tags: ["Updated", "Tags"] });
    expect(res.statusCode).toEqual(404);
    expect(res.text).toBe("Facility not found");
  });

  // Add more tests for other endpoints as needed
});
