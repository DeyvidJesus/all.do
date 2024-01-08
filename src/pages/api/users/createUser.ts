import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { db } = await connect();
      const collection = db.collection("users");
      
      const { credentials } = req.body;

      const { name, email, password } = credentials;

      try {
        const user = await collection.insertOne({ name, email, password });

        res.status(200).json({ user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
  }