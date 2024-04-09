import { Schema, model } from "mongoose";

const hashedPasswordsSchema = new Schema({
  uniqueId: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  name: { type: String, required: false, default: "" },
  email: { type: String, unique: true, required: true },
  passwords: {
    type: Array,
    required: true,
    default: [
      {
        passwordtag: String,
        passwordHash: String,
      },
    ],
  },
});

const hashedPasswords = model("hashedPasswords", hashedPasswordsSchema);

export default hashedPasswords;
