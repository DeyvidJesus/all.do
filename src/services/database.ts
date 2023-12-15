import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DATABASE_URI || "";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export default async function connect() {
    await client.connect();

    const db = client.db("alldo");
    const collection = db.collection("tasks");

    return {db, collection, client};
}