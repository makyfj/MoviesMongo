import clientPromise from "../../lib/mongodb";
import { useRouter } from "next/router";
import mongoose from "mongoose";

export default function TopId({ topId }) {
  return (
    <div>
      <h1>Movie: {topId.title}</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <h2>Rating: {topId.metacritic}</h2>
      <p>Plot: {topId.plot}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const client = await clientPromise;
  const db = await client.db();

  const { tid } = router.query;

  const topId = await db
    .collection("movies")
    .find({ _id: mongoose.Types.ObjectId(tid) })
    .toArray();

  return {
    props: {
      topId: JSON.parse(JSON.stringify(topId)),
    },
  };
}
