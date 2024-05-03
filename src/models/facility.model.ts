// models/facility.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface IFacility extends Document {
  Name: string;
  Location: {
    coordinates: number[];
    type: string;
  };
  Category: string;
  Tags: string;
  Operations: string;
  Reviews: mongoose.Schema.Types.ObjectId[];
  Date: Date;
  PictureURL: string[];
  RatingAVG: number;
  Favorites: number;
  Reports: number;
}

const FacilitySchema: Schema = new Schema({
  Name: { type: String, required: true },
  Location: {
    coordinates: { type: [Number], required: true },
    type: { type: String, default: "Point", enum: ["Point"] },
  },
  Category: { type: String, required: true },
  Tags: [{ type: String, required: false }],
  Operations: { type: String, required: true },
  Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  Date: { type: Date, required: true },
  PictureURL: { type: String, required: false },
  RatingAVG: { type: Number, required: true },
  Favorites: { type: Number, required: true },
  Reports: { type: Number, required: false },
});

FacilitySchema.index({ Location: "2dsphere" });

export default mongoose.model<IFacility>(
  "facilities",
  FacilitySchema,
  "facilities",
);
