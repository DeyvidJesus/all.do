import connect from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { db } = await connect();
        const projectsCollection = db.collection("projects");
        const tasksCollection = db.collection("tasks");

        const { id, nameToLowerCase, user_email } = req.body;

        try {
            await tasksCollection.deleteMany({ project: nameToLowerCase, user_email });

            res.status(200).json({ success: true });
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        return;
    }

    try {
        const result = await projectsCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false, error: "Resource not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
} else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
}