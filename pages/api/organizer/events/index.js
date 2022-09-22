//USERS API ROUTE for logged in users
import nc from "next-connect";
const { ObjectId } = require("mongodb");

import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/config/ncoptions";
import parseMultiPartyForm from "@/utils/parseMultiPartyForm";
const handler = nc(ncoptions);
import eventsLib from "@/lib/eventsLib";
import cloudinaryLib from "@/lib/cloudinaryLib";

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
  if (session && session.user.roles.includes("organizer")) {
    req.sessionUser = session.user;
    const client = await clientPromise;
    req.db = client.db();
    next();
  } else {
    console.error("not authenticated , ", session);
    res
      .status(401)
      .end("You don't have permission to do this, you are not an organizer");
    return;
  }
});

//Adds new event
handler.post(async (req, res) => {
  const db = req.db;
  try {
    //parsing data
    const parsedEvent = await eventsLib.parseNewEventData(req);
    parsedEvent._id = ObjectId();
    const eventPhotoUrl = await cloudinaryLib.uploadEventPhoto(
      req.files,
      parsedEvent._id.toString()
    ); //uploadphoto to cloudinary

    if (!eventPhotoUrl) {
      res.status(500).json({ error: "error uploading event photo" });
      return;
    }

    parsedEvent.photo = eventPhotoUrl;

    //save event to DB
    await db.collection("events").insertOne(parsedEvent);
    res.status(200).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("error saving event", error);
    res.status(500).json({ error });
    return;
  }
});

handler.get(async (req, res) => {
  const db = req.db;
  const { id } = req.sessionUser;

  const { page, sort, order, limit } = req.query;

  if (!page || !sort || !order || !limit) {
    res
      .status(400)
      .end("You need to provide page, sort and order query params");
    return;
  }

  try {
    //get all events by organizer using createdBy with pagination
    const events = await db
      .collection("events")
      .find({ createdBy: id })
      .sort({ [sort]: order })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .project({
        _id: 1,
        eventType: 1,
        isPublic: 1,
        name: 1,
        photo: 1,
      })
      .toArray();

    //get count of all events by organizer using createdBy
    const eventsCount = await db
      .collection("events")
      .countDocuments({ createdBy: id });

    res.json({
      events,
      count: eventsCount,
      totalPages: Math.ceil(eventsCount / limit),
    });
  } catch (error) {
    console.error("error getting events", error);
    res.status(500).json({ error });
    return;
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
