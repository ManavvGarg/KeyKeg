import { Schema, model } from "mongoose";

const hashedPasswordsSchema = new Schema({
  uniqueId: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwords: [
    {
      passwordtag: String,
      passwordHash: String,
    },
  ],
});

const hashedPasswords = model("hashedPasswords", hashedPasswordsSchema);

export default hashedPasswords;
