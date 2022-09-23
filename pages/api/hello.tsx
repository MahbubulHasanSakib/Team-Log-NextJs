import JSONdata from "../../data.json";
const fs = require("fs");
import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      fs.writeFileSync("data.json", JSON.stringify(req.body.data));
      res.status(200).send("data:" + req.body.data);
    } catch (err) {
      console.error(err);
    }
  } else if (req.method === "GET") res.status(200).json(JSONdata);
}
