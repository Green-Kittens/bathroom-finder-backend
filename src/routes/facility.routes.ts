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
router.get("/", getAllBathrooms);

// Retrieve information on a specific bathroom
router.get("/:id", getBathroomById);

// Create a new bathroom
router.post("/", createBathroom); //withAuth,

// Retrieve all tags currently applied to the bathroom
router.get("/:id/tags", getBathroomTags);

// Update the list of tags for a bathroom
router.put("/:id/tags", updateBathroomTags);

export default router;
