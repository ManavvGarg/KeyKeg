import { connectDatabase, disconnectDatabase } from "@/providers/dbProvider";
import { NextResponse } from "next/server";

async function handler(req, res) {
  if (req.method === "GET") {
    let connFlag = await connectDatabase();
    if (connFlag.flag == true) {
      let passwords = [];
      let mail = decodeURIComponent(req.url.split("?email=")[1]);
      await connFlag.clientConnection
        .db(process.env.MONGO_DB)
        .collection("hashedPasswords")
        .findOne({
          email: mail,
        })
        .then(async (data, error) => {
          if (data) {
            passwords = data.passwords;
          }
        });

      await disconnectDatabase(connFlag.clientConnection);

      return new NextResponse(JSON.stringify({ pass: passwords }), {
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
