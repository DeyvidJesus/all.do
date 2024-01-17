import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connect();
    const collection = db.collection("tasks");

    const { actualPage, search, user_email } = req.query;

    try {
        let query;

        switch (actualPage) {
            case 'hoje':
                const todayDateString = new Date().toLocaleDateString('en-US');
                query = { deadline: todayDateString, user_email }
                break;
            case 'em-breve':
                const today = new Date().toLocaleDateString('en-US');

                query = {
                    deadline: {
                        $gte: today
                    },
                    user_email
                };
                break;
            case 'todos':
                query = { user_email }
                break;
            case 'pesquisa':
                query = {
                    $and: [
                        { user_email },
                        {
                            $or: [
                                { name: { $regex: search, $options: 'i' } },
                                { description: { $regex: search, $options: 'i' } },
                            ],
                        }
                    ]
                }
                break;
            default:
                query = { project: actualPage, user_email }
                break;
        }

        const tasksData = await collection.find(query).toArray();
        res.status(200).json(tasksData);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}