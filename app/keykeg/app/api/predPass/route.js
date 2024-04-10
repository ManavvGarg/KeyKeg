import { NextResponse } from "next/server";

async function handler(req, res) {
  const pass = {
    flag: false,
    prediction: "",
  };
  if (req.method === "POST") {
    const body = await req.json();
    if (body.password) {
      //console.log(body.password);

      await fetch(
        `https://11mnv-keykeg.hf.space/predict?password=${body.password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          let asd = JSON.stringify(data);
          console.log(data);
          pass.flag = true;
          pass.prediction = asd.prediction;
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
        });

      return new NextResponse(JSON.stringify({ pass }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } else {
      return new NextResponse(JSON.stringify({ pass }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export { handler as GET, handler as POST };
