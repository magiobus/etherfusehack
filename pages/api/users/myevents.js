import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/utils/ncoptions";
import { getSession } from "next-auth/react";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  const session = await getSession({ req });
  if (session) {
    req.sessionUser = session.user;
    const client = await clientPromise;
    req.db = client.db();
    next();
  } else {
    res.status(401).end("You are not authorized");
    return;
  }
});

//this is for create project form eventslist
//it returns the events where the user is registred
handler.get(async (req, res) => {
  const db = req.db;
  const user = req.sessionUser;
  try {
    //get tickets of user
    const tickets = await db
      .collection("tickets")
      .aggregate([
        {
          $match: {
            userEmail: user.email,
          },
        },
        { $addFields: { eventId: { $toObjectId: "$eventId" } } },
        {
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $unwind: "$event",
        },
      ])
      .toArray();

    //get events of user tickets
    const events = tickets.map((ticket) => ticket.event);

    //Delete repeated events using event id key
    const uniqueEvents = Array.from(new Set(events.map((a) => a._id))).map(
      (id) => {
        return events.find((a) => a._id === id);
      }
    );

    res.json(uniqueEvents);
  } catch (error) {
    console.error("error at get events", error.message);
    res.status(500).json({ message: "Error fetching events" });
  }
});

export default handler;
