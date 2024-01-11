import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { db } = await connect();
      const collection = db.collection("users");
      
      const { name, email, password } = req.body;

      try {
        const user = await collection.findOne({email});

        if(user) {
          res.status(200).json({ success: false, error: 'This email is already in use.' });
          return;
        }

        await collection.insertOne({ name, email, password });

        res.status(200).json({ success: true, message: 'User created!'});
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
  }