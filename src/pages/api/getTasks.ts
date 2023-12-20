import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { collection } = await connect();

    const { actualPage, search } = req.query;

    try {
        let query;

        switch (actualPage) {
            case 'today':
                const todayDateString = new Date().toLocaleDateString('en-US');
                query = { deadline: todayDateString }
                break;
            case 'upcoming':
                const today = new Date().toLocaleDateString('en-US');

                query = {
                    deadline: { $gte: today },
                };
                break;
            default:
                query = { project: actualPage }
                break;
        }

        const tasksData = await collection.find(query).toArray();
        res.status(200).json(tasksData);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}