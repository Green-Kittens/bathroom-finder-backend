import express from "express";
import { withAuth } from '../middleware/authMiddleware.js';

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
router.get("/:bathroomId", getBathroomById);

// Create a new bathroom
router.post("/", createBathroom);

// Retrieve all tags currently applied to the bathroom
router.get("/:bathroomId/tags", getBathroomTags);

// Submit a new revision of the list of tags
router.post(":bathroomId/tags", updateBathroomTags);

export default router;
