import clientPromise from "../../../lib/mongodb";
import mongodb from "mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = await client.db();

  // query id
  const { mid } = req.query;

  const movie = await db
    .collection("movies")
    .find({ _id: mongodb.ObjectId(mid) })
    .toArray();

  res.json(movie);
};
