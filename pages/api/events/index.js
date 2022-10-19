//STORES API ROUTE to check availability of storeslug (for logged in users)
import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/utils/ncoptions";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //connects to database
  const client = await clientPromise;
  req.db = client.db();
  next();
});

//checks if email is already registred as a user
handler.get(async (req, res) => {
  const db = req.db;
  try {
    const events = await db.collection("events").find({}).toArray();
    res.json(events);
  } catch (error) {
    console.error("error at get events", error.message);
    res.status(500).json({ message: "Error fetching events" });
  }
});

export default handler;
