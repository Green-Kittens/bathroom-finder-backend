// bathroom.service.ts
import Facility from "../models/facility.model.js";

export class BathroomService {
  async getAllBathrooms() {
    return await Facility.find({});
  }

  async getBathroomById(bathroomId: string) {
    return await Facility.findById(bathroomId);
  }

  async createBathroom(bathroomData: any) {
    const newFacility = new Facility(bathroomData);
    return await newFacility.save();
  }

  async getBathroomTags(bathroomId: string) {
    return await Facility.findById(bathroomId).select("Tags -_id");
  }

  async updateBathroomTags(bathroomId: string, tags: string[]) {
    return await Facility.findByIdAndUpdate(
      bathroomId,
      { $set: { Tags: tags } },
      { new: true, runValidators: true },
    );
  }
}
