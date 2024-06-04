import express from "express";
import { uploadImage } from "../controllers/images.controller.js";
import { Multer } from "multer";

function buildRouter(upload: Multer) {
  const router = express.Router();

  // Upload a new image and return it's URL
  router.put("/", upload.single("image"), uploadImage);

  return router;
}

export default buildRouter;
