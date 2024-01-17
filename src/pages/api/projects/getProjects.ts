import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connect();
    const collection = db.collection("projects");

    const { user_email } = req.query;

    try {
        const projectsData = await collection.find({ user_email }).toArray();
        res.status(200).json(projectsData);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}