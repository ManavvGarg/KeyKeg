import { connectDatabase, disconnectDatabase } from "@/providers/dbProvider";
import generatePassword from "@/utils/generatePass";
import { NextRequest, NextResponse } from "next/server";

async function handler(req, res) {
  if (req.method === "GET") {
    let connFlag = await connectDatabase();
    if (connFlag.flag == true) {
      const password = generatePassword(32);
      await disconnectDatabase(connFlag.clientConnection);

      return new NextResponse(JSON.stringify({ pass: password }), {
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
