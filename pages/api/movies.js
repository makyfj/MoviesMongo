import clientPromise from "../../lib/mongodb";

//Next.js with API Endpoint with MongoDB
export default async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(movies);
};
