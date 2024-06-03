// models/facility.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface IFacility extends Document {
  Name: string;
  Category: string;
  Tags: string;
  Operations: string;
  Reviews: mongoose.Schema.Types.ObjectId[];
  Date: Date;
  PictureURL: string[];
  RatingAVG: number;
  Favorites: number;
  Reports: number;
  Coordinates: number[];
  Description: string;
}

const FacilitySchema: Schema = new Schema({
  Name: { type: String, required: true },
  Category: { type: String, required: true },
  Tags: [{ type: String, required: false }],
  Operations: { type: String, required: true },
  Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  Date: { type: Date, required: true },
  PictureURL: { type: [String], required: false },
  RatingAVG: { type: Number, required: true },
  Favorites: { type: Number, required: false },
  Reports: { type: Number, required: false },
  Coordinates: { type: [Number], required: true },
});

export default mongoose.model<IFacility>(
  "facilities",
  FacilitySchema,
  "facilities",
);
