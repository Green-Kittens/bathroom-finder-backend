import Review from "../models/review.model.js";
import { Request, Response } from "express";

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).send(newReview);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all reviews
export const getAllReviews = async (_: Request, res: Response) => {
  try {
    const reviews = await Review.find({});
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a review by ID
export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
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
    res.status(400).send(error);
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};
