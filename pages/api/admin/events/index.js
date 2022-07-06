//USERS API ROUTE for logged in users
import nc from "next-connect";
const multer = require("multer");
const { ObjectId } = require("mongodb");

import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/config/ncoptions";
import getCloudinary from "@/utils/getCloudinary";
import parseMultiPartyForm from "@/utils/parseMultiPartyForm";
import dateNowUnix from "@/utils/dateNowUnix";
const upload = multer({ dest: "/tmp" });
const handler = nc(ncoptions);
const cloudinary = getCloudinary(); //gets configuration from utils/getcloudinary.js

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //parses form data using multiparty
  try {
    await parseMultiPartyForm(req);
  } catch (error) {
    console.log("error parsing form data request", error);
    res.status(500).json({ error });
    return;
  }

  //gets session and connects to DB Client if authenticated
  //TODO: check later how to check using JWT instead of session...
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

//Adds new event
handler.post(async (req, res) => {
  const db = req.db;

  const {
    name,
    description,
    startTime,
    endTime,
    isPublic,
    locationUrl,
    placeAddress,
    placeCity,
    placeName,
    placeState,
    placeCountry,
  } = req.body;

  //todo: validate data before saving, maybe using joi
  try {
    //converting datetimes to unix timestamps
    const parsedStartTime = new Date(startTime).getTime() / 1000;
    const parsedEndTime = new Date(endTime).getTime() / 1000;

    //create event object
    const event = {
      name,
      description,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
      isPublic: isPublic === "true",
      placeAddress,
      placeCity,
      placeName,
      placeState,
      placeCountry,
      attendees: [],
      archived: false,
      locationUrl: locationUrl || "",
      createdAt: dateNowUnix(),
      updatedAt: dateNowUnix(),
      createdBy: req.sessionUser._id || "",
    };

    //save event to DB
    const result = await db.collection("events").insertOne(event);
    const eventId = result.insertedId;

    if (!req.files) {
      //delete event if no image was uploaded
      await db.collection("events").deleteOne({ _id: ObjectId(eventId) });
      res.status(400).json({ error: "No files were uploaded" });
      return;
    }

    const { photo } = req.files;

    if (photo) {
      upload.single("photo");
      //upload image to cloudinary
      try {
        const result = await cloudinary.uploader.upload(photo[0].path, {
          folder: `events_${process.env.NODE_ENV}`,
          public_id: `${eventId}/photo`,
          overwrite: true,
          width: 1280,
          height: 640,
          crop: "fill",
          format: "jpg",
        });
        event.photo = result.secure_url;

        //update event in DB
        await db
          .collection("events")
          .updateOne({ _id: new ObjectId(eventId) }, { $set: event });

        res.status(200).json({ event });
        return;
      } catch (error) {
        console.log("error uploading image", error);
        //delete event from DB
        await db.collection("events").deleteOne({ _id: new ObjectId(eventId) });
        res.status(500).json({ error });
        return;
      }
    }

    // await db.collection("events").insertOne(event);
    res.status(200).json({ message: "Event created successfully" });
  } catch (error) {
    console.log("error saving event", error);
    res.status(500).json({ error });
    return;
  }
});

//GET Events
handler.get(async (req, res) => {
  const db = req.db;
  //get all events sorted by newest

  const events = await db
    .collection("events")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  res.json(events);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
