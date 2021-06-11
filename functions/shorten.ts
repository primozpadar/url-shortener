import { Handler } from "@netlify/functions";
import faunadb from "faunadb";
import { nanoid } from "nanoid";
import { isValidUrl } from "../utils/isValidUrl";

const { Create, Collection } = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "POST") return { statusCode: 404 };
  const longURL = event.queryStringParameters.url;
  if (!longURL || !isValidUrl(longURL)) return { statusCode: 400 };

  const data = {
    shortId: nanoid(8),
    longURL,
  };

  try {
    type Response = { data: { longURL: string; shortId: string } };
    const doc = await client.query<Response>(
      Create(Collection("urls"), { data })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", data: doc.data }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "error", message: "invalid url id" }),
    };
  }
};

export { handler };
