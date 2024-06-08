import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Facility from "../src/models/facility.model.js";

describe("Facility Model Test", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("create & save facility successfully", async () => {
    const facilityData = {
      Name: "Facility One",
      Category: "General",
      Tags: ["Wheelchair accessible", "Baby changing"],
      Operations: "9am-5pm",
      Reviews: [], // Assuming reviews would be added in real scenarios
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
    };

    const validFacility = new Facility(facilityData);
    const savedFacility = await validFacility.save();

    expect(savedFacility._id).toBeDefined();
    expect(savedFacility.Name).toBe(facilityData.Name);
    // Add more assertions as needed
  });

  // Additional tests for validation, etc.
});
