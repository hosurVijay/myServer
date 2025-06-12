import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
