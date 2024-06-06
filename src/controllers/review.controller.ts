import Review from "../models/review.model.js";
import { Request, Response, NextFunction } from "express";

// Create a new review
export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).send(newReview);
  } catch (error) {
    next(error);
  }
};

// Get all reviews
export const getAllReviews = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await Review.find({});
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

// Get a review by ID
export const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    next(error);
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    next(error);
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    next(error);
  }
};
