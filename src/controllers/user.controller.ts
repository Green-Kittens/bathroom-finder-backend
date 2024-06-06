import User from "../models/user.model.js";
import { Request, Response, NextFunction } from "express";

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// Get a single user by UserID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ UserID: req.params.UserID });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// Update a user by UserID
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOneAndUpdate(
      { UserID: req.params.UserID },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// Delete a user by UserID
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOneAndDelete({ UserID: req.params.UserID });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
