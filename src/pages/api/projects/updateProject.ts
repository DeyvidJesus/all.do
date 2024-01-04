import connect from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { db } = await connect();
        const collection = db.collection("projects");

        const { formData } = req.body;

        const { name, color, id } = formData;

        try {
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: { name, color } },);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}