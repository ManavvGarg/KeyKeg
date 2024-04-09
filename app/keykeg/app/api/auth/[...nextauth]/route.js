"use server";

import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";
import { connectDatabase, disconnectDatabase } from "@/providers/dbProvider";

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    async signIn(user) {
      try {
        // Connect to MongoDB
        const db = await connectDatabase();

        // Save user data to MongoDB
        await db.clientConnection
          .db(process.env.MONGO_DB)
          .collection("users")
          .findOne({ email: user.user.email })
          .then(async (data, error) => {
            if (data) {
              console.log("data found");
              return true;
            } else {
              console.log("data not found. making");
              await db.clientConnection
                .db(process.env.MONGO_DB)
                .collection("users")
                .insertOne({
                  email: user.user.email,
                  name: user.user.name,
                  username: user.user.email.split("@")[0],
                  uniqueId: user.user.id,
                  password_count: 0,
                });

              await db.clientConnection
                .db(process.env.MONGO_DB)
                .collection("hashedPasswords")
                .insertOne({
                  email: user.user.email,
                  name: user.user.name,
                  username: user.user.email.split("@")[0],
                  uniqueId: user.user.id,
                  passwords: [],
                });
            }
          });
        await disconnectDatabase(db.clientConnection);
        return true; // Indicate sign-in success
      } catch (error) {
        console.error("Error saving user data to MongoDB:", error);
        return false; // Indicate sign-in failure
      }
    },
  },
});

export { handler as GET, handler as POST };
