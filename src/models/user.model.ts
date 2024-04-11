import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  Favorites: mongoose.Schema.Types.ObjectId[];
  Reviews: mongoose.Schema.Types.ObjectId[];
  DateJoined: Date;
  pfpURL: string;
  DisplayName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  Favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Facility" }],
  Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  DateJoined: { type: Date, required: true },
  pfpURL: { type: String, required: true },
  DisplayName: { type: String, required: true },
});

export default mongoose.model<IUser>("users", UserSchema, "users");
