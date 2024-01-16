import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connect();
    const collection = db.collection("users");

    const { credentials } = req.body;
    const { email, password } = credentials;

    try {
        const user = await collection.findOne({ email, password });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}