import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connect();
    const collection = db.collection("users");

    const { email } = req.body;

    try {
        const userData = await collection.findOne({email});
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}