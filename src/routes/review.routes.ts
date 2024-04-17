import express from "express";


const router = express.Router();
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

// Route to create a new review
router.post("/", createReview); //withAuth,
// Route to get all reviews
router.get("/", getAllReviews);
// Route to get a single review by id
router.get("/:id", getReviewById);
// Route to update a review
router.put("/:id", updateReview); //withAuth,
// Route to delete a review
router.delete("/:id", deleteReview); //withAuth,

export default router;
