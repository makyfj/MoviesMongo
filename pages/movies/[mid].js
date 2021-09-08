import clientPromise from "../../lib/mongodb";
import mongoose from "mongoose";

// TESTING - not working atm
export default function Movie({ movie }) {
  return (
    <div>
      <h1>Movie: {movie.title}</h1>
      <h3>Critic: {movie.metacritic}</h3>
      <p>Plot: {movie.plot}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  // connect to db
  const client = await clientPromise;
  const db = await client.db();

  // get moviesId from localhost:3000/movies/{mid}
  const { mid } = context.query;

  const movie = await db.collection("movies").find({ _id: mid }).toArray();

  console.log(JSON.parse(JSON.stringify(movie)));

  return {
    props: {
      movie: JSON.parse(JSON.stringify(movie)),
    },
  };
}
