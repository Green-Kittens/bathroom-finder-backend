import { Request, Response } from "express";
import Facility from "../models/facility.model.js"; // Importing the Facility model

// Retrieve a list of all bathrooms
export const getAllBathrooms = async (req: Request, res: Response) => {
  try {
    const facilities = await Facility.find({});
    res.json(facilities);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Retrieve information on a specific bathroom
export const getBathroomById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const facility = await Facility.findById(id);
    if (!facility) return res.status(404).send("Bathroom not found");
    res.json(facility);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Create a new bathroom
export const createBathroom = async (req: Request, res: Response) => {
  try {
    const newFacility = new Facility(req.body);
    const savedFacility = await newFacility.save();
    res.status(201).json(savedFacility);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Retrieve all tags currently applied to the bathroom
export const getBathroomTags = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const facility = await Facility.findById(id).select("Tags -_id");
    if (!facility) {
      return res.status(404).send("Facility not found");
    }
    res.json(facility.Tags);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update the list of tags for a bathroom
export const updateBathroomTags = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tags } = req.body;

  try {
    const facility = await Facility.findByIdAndUpdate(
      id,
      { $set: { Tags: tags } },
      { new: true, runValidators: true },
    );

    if (!facility) {
      return res.status(404).send("Facility not found");
    }

    res.json(facility.Tags);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
