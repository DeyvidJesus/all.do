import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { collection } = await connect();

    const { actualPage, search } = req.query;

    try {
        if (search !== undefined) {
            const tasksData = await collection.find({project: actualPage, name: search}).toArray();
            res.status(200).json(tasksData);
        } else {
            const tasksData = await collection.find({project: actualPage}).toArray();
            res.status(200).json(tasksData);
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}