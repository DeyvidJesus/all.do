import connect from "@/utils/database";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(req: NextRequest, res: NextApiResponse) {
    const { db } = await connect();
    const collection = db.collection("projects");

    try {
        const projectsData = await collection.find({}).toArray();
        res.status(200).json(projectsData);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}