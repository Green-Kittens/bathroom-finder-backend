import mongoose from "mongoose";
import User from "../src/models/user.model.js";

describe("User Model Test", () => {
  it("create & save user successfully", async () => {
    const userData = {
      Email: "test@test.com",
      PictureURL: "https://example.com/profilepic.jpg",
      DateJoined: new Date(),
      DisplayName: "Test User",
      UserID: "12345",
    };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.Email).toBe(userData.Email);
    expect(savedUser.PictureURL).toBe(userData.PictureURL);
    expect(savedUser.DateJoined).toBeDefined();
  });

  // Add more tests here for validation, querying, etc.
});
