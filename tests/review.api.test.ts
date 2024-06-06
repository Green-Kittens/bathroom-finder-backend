import request from "supertest";
import app from "../src/index";
import { connectDatabase } from "../src/database";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;
let createdReviews: string[] = []; // Explicitly type the array

beforeAll(async () => {
  await connectDatabase();
  server = app.listen(3000);
});

afterAll(async () => {
  for (const reviewID of createdReviews) {
    await request(app).delete(`/reviews/${reviewID}`);
  }
  await server.close();
  await mongoose.connection.close();
});

describe("Review API Endpoints", () => {
  it("should create a new review", async () => {
    const reviewPayload = {
      Rating: 4.5,
      Likes: 50,
      Dislikes: 10,
      PictureURL: ["https://example.com/review.jpg"],
      FacilityID: "606d1f3e6a08e1201c7df64b", // Adjust to a valid ObjectId
      UserID: "12345",
      Date: new Date(),
      Description: "Great facility!",
    };

    const res = await request(app).post("/reviews").send(reviewPayload);

    console.log("Create Review Response Body:", res.body); // Log response body for debugging

    createdReviews.push(res.body._id); // Track created review

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.Description).toBe("Great facility!");
  });

  it("should fetch a review by ID", async () => {
    // Create a review via the API
    const createRes = await request(app)
      .post("/reviews")
      .send({
        Rating: 4.5,
        Likes: 50,
        Dislikes: 10,
        PictureURL: ["https://example.com/review.jpg"],
        FacilityID: "606d1f3e6a08e1201c7df64b", // Adjust to a valid ObjectId
        UserID: "12345",
        Date: new Date(),
        Description: "Great facility!",
      });

    createdReviews.push(createRes.body._id); // Track created review

    // Fetch the review by ID
    const res = await request(app).get(`/reviews/${createRes.body._id}`).send();

    console.log("Fetch Review Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body._id).toBe(createRes.body._id);
  });

  it("should update a review by ID", async () => {
    const updatePayload = {
      Description: "Updated description",
      Rating: 5,
    };

    const createRes = await request(app)
      .post("/reviews")
      .send({
        Rating: 4.5,
        Likes: 50,
        Dislikes: 10,
        PictureURL: ["https://example.com/review.jpg"],
        FacilityID: "606d1f3e6a08e1201c7df64b", // Adjust to a valid ObjectId
        UserID: "12345",
        Date: new Date(),
        Description: "Great facility!",
      });

    createdReviews.push(createRes.body._id); // Track created review

    const res = await request(app)
      .put(`/reviews/${createRes.body._id}`)
      .send(updatePayload);

    console.log("Update Review Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(200);
    expect(res.body.Description).toBe("Updated description");
    expect(res.body.Rating).toBe(5);
  });

  it("should delete a review by ID", async () => {
    const createRes = await request(app)
      .post("/reviews")
      .send({
        Rating: 4.5,
        Likes: 50,
        Dislikes: 10,
        PictureURL: ["https://example.com/review.jpg"],
        FacilityID: "606d1f3e6a08e1201c7df64b", // Adjust to a valid ObjectId
        UserID: "12345",
        Date: new Date(),
        Description: "Great facility!",
      });

    const res = await request(app).delete(`/reviews/${createRes.body._id}`);

    console.log("Delete Review Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body._id).toBe(createRes.body._id);

    // Verify deletion
    const fetchRes = await request(app).get(`/reviews/${createRes.body._id}`);
    expect(fetchRes.statusCode).toEqual(404);
  });

  // Error scenario: invalid input
  it("should return 400 for invalid input", async () => {
    const invalidPayload = {
      Rating: "invalid", // Invalid rating format
      Likes: "invalid", // Invalid likes format
      Dislikes: "invalid", // Invalid dislikes format
      PictureURL: ["https://example.com/review.jpg"],
      FacilityID: "invalid", // Invalid ObjectId format
      UserID: "invalid", // Invalid ObjectId format
      Date: "invalid", // Invalid date format
      Description: "", // Empty description
    };

    const res = await request(app).post("/reviews").send(invalidPayload);

    console.log("Invalid Input Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });

  // Error scenario: update non-existent review
  it("should return 404 for non-existent review when updating", async () => {
    const updatePayload = {
      Description: "Non-existent review",
      Rating: 3,
    };

    const res = await request(app)
      .put("/reviews/606d1f3e6a08e1201c7df64b") // Use a non-existent ID
      .send(updatePayload);

    console.log("Update Non-existent Review Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(404);
  });

  // Error scenario: delete non-existent review
  it("should return 404 for non-existent review when deleting", async () => {
    const res = await request(app).delete("/reviews/606d1f3e6a08e1201c7df64b"); // Use a non-existent ID

    console.log("Delete Non-existent Review Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(404);
  });

  // Error scenario: fetch non-existent review
  it("should return 404 for non-existent review when fetching by ID", async () => {
    const res = await request(app).get("/reviews/606d1f3e6a08e1201c7df64b"); // Use a non-existent ID

    console.log("Fetch Non-existent Review Response Body:", res.body); // Log response body for debugging

    expect(res.statusCode).toEqual(404);
  });
});
