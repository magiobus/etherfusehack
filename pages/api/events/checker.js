//STORES API ROUTE to check availability of storeslug (for logged in users)
import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/utils/ncoptions";
import NextCors from "nextjs-cors";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //connects to database
  const client = await clientPromise;
  req.db = client.db();

  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  next();
});

//checks if email is already registred as a user
handler.post(async (req, res) => {
  const db = req.db;
  const { email, eventId } = req.body;

  if (!email || !eventId) {
    return res.status(404).send("Missing email or eventId");
  }

  //check if user is in event
  const hasTicket = await db.collection("tickets").findOne({
    eventId: eventId,
    userEmail: email,
  });

  if (!hasTicket) {
    return res
      .status(404)
      .send({ error: "No ticket found for this event and email" });
  }

  const response = {
    email: hasTicket?.userEmail,
    name: hasTicket?.user?.name,
    inPerson: hasTicket?.inPerson,
    ipnStudent: hasTicket?.ipnStudent,
  };

  return res.status(200).send(response);
});

export default handler;
