import connect from "@/services/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { collection } = await connect();

    const { actualPage, search } = req.query;

    let query;

    if (search !== '') {
        query = `project: ${actualPage}, name: ${search}`;
    } else {
        query = `project: ${actualPage}`
    }

    try {
        const tasksData = await collection.find({query}).toArray();
        res.status(200).json(tasksData);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}