// bathroom.controller.ts
import { Request, Response } from "express";
import { BathroomService } from "../services/facility.service.js";

const bathroomService = new BathroomService();

export const getAllBathrooms = async (req: Request, res: Response) => {
  try {
    const facilities = await bathroomService.getAllBathrooms();
    res.json(facilities);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const getBathroomById = async (req: Request, res: Response) => {
  const { bathroomId } = req.params;
  try {
    const facility = await bathroomService.getBathroomById(bathroomId);
    if (!facility) return res.status(404).send("Bathroom not found");
    res.json(facility);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const createBathroom = async (req: Request, res: Response) => {
  try {
    const savedFacility = await bathroomService.createBathroom(req.body);
    res.status(201).json(savedFacility);
  } catch (err) {
    res.status(400).send("Bad Request");
  }
};

export const getBathroomTags = async (req: Request, res: Response) => {
  const { bathroomId } = req.params;
  try {
    const facility = await bathroomService.getBathroomTags(bathroomId);
    if (!facility) {
      return res.status(404).send("Facility not found");
    }
    res.json(facility.Tags);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const updateBathroomTags = async (req: Request, res: Response) => {
  const { bathroomId } = req.params;
  const { tags } = req.body;

  try {
    const facility = await bathroomService.updateBathroomTags(bathroomId, tags);
    if (!facility) {
      return res.status(404).send("Facility not found");
    }
    res.json(facility.Tags);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
