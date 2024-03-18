import express from "express";
const router = express.Router();
import {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
} from "../controllers/facility.controller.js";

// Route to create a new facility
router.post("/facilities", createFacility);
// Route to get all facilities
router.get("/facilities", getAllFacilities);
// Route to get a single facility by id
router.get("/facilities/:id", getFacilityById);
// Route to update a facility
router.put("/facilities/:id", updateFacility);
// Route to delete a facility
router.delete("/facilities/:id", deleteFacility);

export default router;
