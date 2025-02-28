import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  location: [number, number];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: {
      type: [Number],
      required: true,
      validate: {
        validator: function (val: number[]) {
          return val.length === 2;
        },
        message:
          "Location must contain exactly two numbers (latitude and longitude).",
      },
    },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
