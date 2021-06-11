import { Handler } from "@netlify/functions";
import faunadb from "faunadb";

const { Get, Match, Index } = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

/**
 * redirect user based on given short id to full id (which is stored in database)
 * (example: .../u/shortid123)
 */
const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "GET") return { statusCode: 404 };

  // Get short id from url (example: something.com/u/shortid123 -> shortid123)
  const segments = event.path.split("/").filter(Boolean);
  if (segments.length !== 2) return { statusCode: 404 };
  const shortId = segments[1];

  console.log(shortId);

  try {
    type Response = { data: { longURL: string; shortId: string } };
    const doc = await client.query<Response>(
      Get(Match(Index("url_by_id"), shortId))
    );

    // if url exists in db, redirect
    return {
      statusCode: 302,
      headers: {
        Location: doc.data.longURL,
      },
    };
  } catch (e) {
    if (e.message === "instance not found") {
      // TODO - should be handeled differently (probably)
      return { statusCode: 404 };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error" }),
    };
  }
};

export { handler };
