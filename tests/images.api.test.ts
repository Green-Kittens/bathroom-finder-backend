import request from "supertest";
import app from "../src/index.js";
import path from "path";
import { Server } from "http";
import mongoose from "mongoose";
import multer from "multer";
import { fileURLToPath } from 'url';
import jest from 'jest-mock';

let server: Server;
let uploadedFilename: string;

beforeAll(async () => {
  server = app.listen(3000);
});

afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

describe("Image API Endpoints", () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const testImagePath = path.join(__dirname, "test-image.jpg");

  it("should upload an image", async () => {
    const res = await request(app)
      .post("/images")
      .attach("image", testImagePath);

    console.log("Upload Image Response Status:", res.statusCode);
    console.log("Upload Image Response Body:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "File uploaded successfully");
    expect(res.body).toHaveProperty("file");
    uploadedFilename = res.body.file.filename;
  });

  it("should return 500 for an error during image upload", async () => {
    const originalSingle = multer().single;

    const mockSingle = jest.fn((req: any, res: any, callback: (error: Error | null) => void) => {
      callback(new Error("Error uploading file"));
    });

    (multer as any).single = (fieldName: string) => mockSingle as any;

    const res = await request(app)
      .post("/images")
      .attach("image", testImagePath);

    console.log("Error Upload Image Response Status:", res.statusCode);
    console.log("Error Upload Image Response Body:", res.body);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error", "Error uploading file");

    // Restore the original function
    (multer as any).single = originalSingle;
  });
});
