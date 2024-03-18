import express from "express";
const router = express.Router();
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

// Route to create a new user
router.post("/users", createUser);

// Route to get all users
router.get("/users", getAllUsers);

// Route to get a single user by id
router.get("/users/:id", getUserById);

// Route to update a user
router.put("/users/:id", updateUser);

// Route to delete a user
router.delete("/users/:id", deleteUser);

export default router;
