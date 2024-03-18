import express from 'express';
const router = express.Router();
import { createReview, getAllReviews, getReviewById, updateReview, deleteReview } from '../controllers/review.controller';

// Route to create a new review
router.post('/reviews', createReview);
// Route to get all reviews
router.get('/reviews', getAllReviews);
// Route to get a single review by id
router.get('/reviews/:id', getReviewById);
// Route to update a review
router.put('/reviews/:id', updateReview);
// Route to delete a review
router.delete('/reviews/:id', deleteReview);

export default router;