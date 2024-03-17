import express from 'express';
const router = express.Router();
import { createReview, getAllReviews, getReviewById, updateReview, deleteReview } from '../controllers/review.controller';

router.post('/reviews', createReview);
router.get('/reviews', getAllReviews);
router.get('/reviews/:id', getReviewById);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

export default router;
