import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://deyvidgondim10:Dickin-007@alldo.xx5zsqs.mongodb.net/?retryWrites=true&w=majority";

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