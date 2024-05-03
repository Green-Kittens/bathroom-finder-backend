// models/review.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  Rating: number;
  Likes: number;
  Dislikes: number;
  PictureURL: string[];
  FacilityID: mongoose.Schema.Types.ObjectId;
  UserId: mongoose.Schema.Types.ObjectId;
  Date: Date;
  Description: string;
}

const ReviewSchema: Schema = new Schema({
  Rating: { type: Number, required: true },
  Likes: { type: Number, required: true },
  Dislikes: { type: Number, required: true },
  PictureURL: { type: String, required: false },
  FacilityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Date: { type: Date, required: true },
  Description: { type: String, required: true },
});

export default mongoose.model<IReview>("reviews", ReviewSchema, "reviews");
