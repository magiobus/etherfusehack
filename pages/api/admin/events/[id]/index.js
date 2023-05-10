//EVENTS API ROUTE for logged in users
import nc from "next-connect";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
const { ObjectId } = require("mongodb");
import parseMultiPartyForm from "@/utils/parseMultiPartyForm";
import eventsLib from "@/lib/eventsLib";
import cloudinaryLib from "@/lib/cloudinaryLib";
import ncoptions from "@/config/ncoptions";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //parses form data using multiparty
  try {
    await parseMultiPartyForm(req);
  } catch (error) {
    console.error("error parsing form data request", error);
    res.status(500).json({ error });
    return;
  }

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
handler.get(async (req, res) => {
  const { id } = req.query;
  const db = req.db;

  if (id) {
    //get event info with tickets info where localField is objectId and foreign field is string
    //we need to convert foreign field to objectId to match localField in aggregate pipeline

    const events = await db
      .collection("events")
      .aggregate([
        {
          $match: {
            _id: ObjectId(id),
          },
        },
        { $addFields: { _id: { $toString: "$_id" } } },
        {
          $lookup: {
            from: "tickets",
            localField: "_id",
            foreignField: "eventId",
            as: "tickets",
          },
        },
      ])
      .toArray();

    //parse tickets info to divide into ticket types
    const event = events[0];
    const { tickets } = event;
    const attendees = [];
    tickets.forEach((ticket) => {
      if (ticket.ticketType === "attendees") {
        attendees.push(ticket);
      }
    });

    event.tickets = {
      attendees: attendees.reverse(),
    };

    res.json(event);
  } else {
    //return error if no id
    console.error("No id provided");
    res.status(400).end("No eventId provided");
  }
});

//UPDATE EVENT
handler.put(async (req, res) => {
  const { id } = req.query;
  const { id: userId } = req.sessionUser;
  const db = req.db;
  const { _id } = req.body;

  if (!id) {
    res.status(400).end("No eventId provided");
    return;
  }

  try {
    //parse event data
    const parsedEvent = await eventsLib.parseEditEventData(req);

    //update photo event if it exists
    if (req.files && req.files.photo) {
      const eventPhotoUrl = await cloudinaryLib.uploadEventPhoto(
        req.files,
        _id.toString()
      ); //uploadphoto to cloudinary

      if (!eventPhotoUrl) {
        res.status(500).json({ error: "error uploading event photo" });
        return;
      }
      parsedEvent.photo = eventPhotoUrl;
    }

    //update event in DB
    const updatedEvent = await db.collection("events").findOneAndUpdate(
      {
        _id: ObjectId(id),
        createdBy: userId,
      },
      { $set: parsedEvent },
      { returnOriginal: false }
    );

    res.json(updatedEvent.value);
  } catch (error) {
    console.error("error updating event", error);
    res.status(500).json({ error });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
