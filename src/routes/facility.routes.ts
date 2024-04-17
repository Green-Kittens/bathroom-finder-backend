import express from "express";


const router = express.Router();
import {
  getAllBathrooms,
  getBathroomById,
  createBathroom,
  getBathroomTags,
} from "../controllers/facility.controller.js";

// Retrieve a list of all bathrooms
router.get("/", getAllBathrooms);

// Retrieve information on a specific bathroom
router.get("/:bathroomId", getBathroomById);

// Create a new bathroom
router.post("/", createBathroom); //withAuth,

// Retrieve all tags currently applied to the bathroom
router.get("/:bathroomId/tags", getBathroomTags);

export default router;
