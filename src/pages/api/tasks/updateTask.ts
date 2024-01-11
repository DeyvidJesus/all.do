import connect from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { db } = await connect();
        const collection = db.collection("tasks");

        const { formData } = req.body;

        const { id, name, description, deadline, status, project } = formData;

        const [year, month, day] = deadline.split("-");

        const formattedDeadline = new Date(`${month}/${day}/${year}`).toLocaleDateString("en-US");

        if (name == null || description == null || deadline == null || project == null || status == null) {
            res.status(400).json({ success: false, error: "The request is malformed or contains invalid parameters" });
            return;
        }

        try {
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: { name, description, deadline: formattedDeadline, status, project } })

            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}