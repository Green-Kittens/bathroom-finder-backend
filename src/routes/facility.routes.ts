import express from "express";
const router = express.Router();
import {
  getAllBathrooms,
  getBathroomById,
  createBathroom,
  getBathroomTags,
  updateBathroomTags,
} from "../controllers/facility.controller.js";

// Retrieve a list of all bathrooms
router.get("/bathrooms", getAllBathrooms);

// Retrieve information on a specific bathroom
router.get("/bathrooms/:bathroomId", getBathroomById);

// Create a new bathroom
router.post("/bathrooms", createBathroom);

// Retrieve all tags currently applied to the bathroom
router.get("/bathrooms/:bathroomId/tags", getBathroomTags);

// Submit a new revision of the list of tags
router.post("/bathrooms/:bathroomId/tags", updateBathroomTags);

export default router;
