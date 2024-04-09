import { connectDatabase, disconnectDatabase } from "@/providers/dbProvider";
import { NextResponse } from "next/server";

async function handler(req, res) {
  if (req.method === "POST") {
    const body = await req.json();
    //let connFlag = await connectDatabase();
    //connFlag.flag ==
    if (true) {
      console.log(body.password);
      //await disconnectDatabase(connFlag.clientConnection);

      return new NextResponse(JSON.stringify({ pass: true }), {
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
