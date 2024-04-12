import express from "express";
import { withAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

// Route to create a new review
router.post("/", createReview);
// Route to get all reviews
router.get("/", getAllReviews);
// Route to get a single review by id
router.get("/:id", getReviewById);
// Route to update a review
router.put("/:id", updateReview);
// Route to delete a review
router.delete("/:id", deleteReview);

export default router;
