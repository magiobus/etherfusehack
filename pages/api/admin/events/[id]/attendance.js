//EVENTS API ROUTE for logged in users
import nc from "next-connect";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
const { ObjectId } = require("mongodb");
import ncoptions from "@/config/ncoptions";
const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //gets session and connects to DB Client if authenticated
  const session = await getSession({ req });
  if (session && session.user.roles.includes("admin")) {
    req.sessionUser = session.user;
    const client = await clientPromise;
    req.db = client.db();
    next();
  } else {
    res.status(401).end("You don't have permission to do this");
    return;
  }
});

//GET EVENT if it has an ID
handler.put(async (req, res) => {
  const { id } = req.query;
  const { orderId, attended } = req.body;

  if (!id || !orderId) {
    res.status(400).end("No eventId provided");
    return;
  }

  const db = req.db;
  const eventId = ObjectId(id);

  //check if event  exists
  const event = await db.collection("events").findOne({ _id: eventId });
  if (!event) {
    res.status(404).end("Event not found");
    return;
  }
  const { attendees } = event;
  //find orderId in attendees array and update status
  const index = attendees.findIndex((attendee) => attendee.orderId === orderId);
  if (index === -1) {
    res.status(404).end("Attendee not found");
    return;
  }
  attendees[index].attended = JSON.parse(attended);
  //update event
  await db
    .collection("events")
    .updateOne({ _id: eventId }, { $set: { attendees } });

  //add eventId to user events array
  const userId = attendees[index].userId; //this is objectID

  //updates user events array
  if (attended) {
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $push: { eventsAttended: eventId } });
  } else {
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $pull: { eventsAttended: eventId } });
  }

  //return the updated event with the updated attendee
  res.status(200).json(event);
});

export default handler;
