import { connectDatabase, disconnectDatabase } from "@/providers/dbProvider";
import { NextResponse } from "next/server";

async function handler(req, res) {
  if (req.method === "POST") {
    const body = await req.json();
    let connFlag = await connectDatabase();
    if (connFlag.flag == true) {
      await connFlag.clientConnection
        .db(process.env.MONGO_DB)
        .collection("hashedPasswords")
        .findOneAndUpdate(
          {
            email: body.userEmail,
          },
          {
            $push: {
              passwords: {
                passwordHash: body.passwordData,
                passwordTag: body.passwordTag,
              },
            },
          }
        )
        .catch((error) => {
          console.error("Error updating document:", error);
          return new NextResponse(JSON.stringify({ updated: false }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        });
      return new NextResponse(JSON.stringify({ updated: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } else {
      res
        .status(500)
        .json({ error: "Internal Server Error:\nDatabase Connection Failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export { handler as GET, handler as POST };
