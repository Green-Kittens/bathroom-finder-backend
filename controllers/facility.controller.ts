import Facility from '../models/facility.model.js';
import { Request, Response } from 'express';

// Create a new facility
export const createFacility = async (req: Request, res: Response) => {
  try {
    const newFacility = new Facility(req.body);
    await newFacility.save();
    res.status(201).send(newFacility);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all facilities
export const getAllFacilities = async (_: Request, res: Response) => {
  try {
    const facilities = await Facility.find({});
    res.status(200).send(facilities);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a facility by ID
export const getFacilityById = async (req: Request, res: Response) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).send();
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a facility
export const updateFacility = async (req: Request, res: Response) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!facility) {
      return res.status(404).send();
    }
    res.send(facility);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a facility
export const deleteFacility = async (req: Request, res: Response) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) {
      return res.status(404).send();
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send(error);
  }
};
