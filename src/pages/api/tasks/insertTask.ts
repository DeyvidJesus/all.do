import connect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

interface FormDataProps {
  formData: {
    name: string,
    description: string,
    deadline: string
    project?: string,
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { collection } = await connect();

    const { formData }: FormDataProps = req.body;

    const name = formData.name
    const description = formData.description;
    const deadline = formData.deadline;

    const [year, month, day] = deadline.split("-");

    const formattedDeadline = new Date(`${month}/${day}/${year}`).toLocaleDateString("en-US");

    if (name == null || description == null || deadline == null) {
      res.status(400).json({ success: false, error: "The request is malformed or contains invalid parameters" });
      return;
    }

    const newDate = new Date().toLocaleDateString('en-US');

    try {
      collection.insertOne({ name, description, deadline: formattedDeadline, created_at: newDate, status: 'pending', project: 'inbox' });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}