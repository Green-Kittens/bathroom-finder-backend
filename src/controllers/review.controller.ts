// review.controller.ts
import { Request, Response } from "express";
import { ReviewService } from "../services/review.service.js";

const reviewService = new ReviewService();

export const createReview = async (req: Request, res: Response) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).send(newReview);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllReviews = async (_: Request, res: Response) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.body);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await reviewService.deleteReview(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};
