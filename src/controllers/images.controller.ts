import { Request, Response } from "express";

import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";
const CONTAINER_NAME = "images";

// Upload a new image and return the URL upon success
export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const connectionString = process.env.IMAGE_STORAGE_CONNECTION_STRING;
  if (connectionString === undefined) {
    return res.status(500).send("no connection string in env");
  }

  const uuid = crypto.randomUUID();
  let ext: string = "";
  try {
    ext = path.extname(req.file.originalname);
  } catch (error) {
    return res.status(500).send(error);
  }
  const fileName = uuid + ext;
  try {
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient =
      blobServiceClient.getContainerClient(CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.upload(req.file.buffer, req.file.size);
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(201).send(fileName);
};
