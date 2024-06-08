import express from "express";

const router = express.Router();
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

// Route to create a new user
router.post("/", createUser); //withAuth,

// Route to get a single user by id
router.get("/:id", getUserById);

// Route to update a user
router.put("/:id", updateUser); //withAuth,

// Route to delete a user
router.delete("/:id", deleteUser); //withAuth,

export default router;
