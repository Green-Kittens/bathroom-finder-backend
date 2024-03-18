import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Review from "../models/review.model.js";

describe("Review Model Test", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("create & save review successfully", async () => {
    const reviewData = {
      Rating: 4.5,
      Likes: 50,
      Dislikes: 10,
      PictureURL: "https://example.com/pic.jpg",
      FacilityID: new mongoose.Types.ObjectId(),
      UserId: new mongoose.Types.ObjectId(),
      Date: new Date(),
      Description: "Great place!",
    };
    const validReview = new Review(reviewData);
    const savedReview = await validReview.save();

    expect(savedReview._id).toBeDefined();
    expect(savedReview.Rating).toBe(reviewData.Rating);
    // Add more assertions as needed
  });

  // Additional tests for validation, etc.
});
