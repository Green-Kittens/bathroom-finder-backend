import User from "../models/user.model.js";
import { Request, Response } from "express";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single user by UserID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ UserID: req.params.id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a user by UserID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { UserID: req.params.id },
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
    res.status(400).send(error);
  }
};

// Delete a user by UserID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ UserID: req.params.id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
