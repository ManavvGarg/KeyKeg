import { Schema, model } from "mongoose";

const userSchema = new Schema({
  uniqueId: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password_count: { type: Number, required: true, default: 0 },
});

const User = model("users", userSchema);

export default User;
