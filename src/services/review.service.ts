// review.service.ts
import Review from "../models/review.model.js";

export class ReviewService {
  async createReview(reviewData: any) {
    const newReview = new Review(reviewData);
    await newReview.save();
    return newReview;
  }

  async getAllReviews() {
    return await Review.find({});
  }

  async getReviewById(id: string) {
    return await Review.findById(id);
  }

  async updateReview(id: string, reviewData: any) {
    return await Review.findByIdAndUpdate(id, reviewData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteReview(id: string) {
    return await Review.findByIdAndDelete(id);
  }
}
