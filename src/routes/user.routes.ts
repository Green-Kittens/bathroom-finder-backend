import express from "express";
import { withAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

// Route to create a new user
router.post("/", createUser);

// Route to get a single user by id
router.get("/:id", getUserById);

// Route to update a user
router.put("/:id", updateUser);

// Route to delete a user
router.delete("/:id", deleteUser);

export default router;
