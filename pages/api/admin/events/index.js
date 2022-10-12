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
import { zonedTimeToUtc } from "date-fns-tz";
import getUnixTime from "date-fns/getUnixTime";

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

//Adds new event
handler.post(async (req, res) => {
  const db = req.db;
  const user = req.sessionUser;

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
    timeZone,
    attendeeLimit,
    maxTeamSize,
    isGivingShirts,
  } = req.body;

  try {
    //convert newStartTime to unixTimestamp using " timezone
    const startTimeUtcDate = zonedTimeToUtc(startTime, timeZone);
    const startUnixTime = getUnixTime(startTimeUtcDate);
    const endTimeUtcDate = zonedTimeToUtc(endTime, timeZone);
    const endUnixTime = getUnixTime(endTimeUtcDate);

    //create event object
    const event = {
      name,
      description,
      startTime: startUnixTime,
      endTime: endUnixTime,
      isPublic: isPublic === "true",
      placeAddress,
      placeCity,
      placeName,
      placeState,
      placeCountry: "MX",
      archived: false,
      locationUrl: locationUrl || "",
      createdAt: dateNowUnix(),
      updatedAt: dateNowUnix(),
      createdBy: user.id || "",
      price: 0,
      attendeeLimit: parseInt(attendeeLimit) || 0,
      maxTeamSize: parseInt(maxTeamSize) || 5,
      isGivingShirts: isGivingShirts === "true",
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
        console.error("error uploading image", error);
        //delete event from DB
        await db.collection("events").deleteOne({ _id: new ObjectId(eventId) });
        res.status(500).json({ error });
        return;
      }
    }

    // await db.collection("events").insertOne(event);
    res.status(200).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("error saving event", error);
    res.status(500).json({ error });
    return;
  }
});

//GET Events
handler.get(async (req, res) => {
  const db = req.db;
  const { page, sort, order, limit, role } = req.query;

  if (!page || !sort || !order || !limit) {
    console.error("You need to provide page, sort and order query params");
    res
      .status(400)
      .end("You need to provide page, sort and order query params");
    return;
  }

  //add ticket count to every event
  const events = await db
    .collection("events")
    .aggregate([
      { $addFields: { _id: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "tickets",
          let: { eventId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$eventId", "$$eventId"] }],
                },
              },
            },
            {
              $group: {
                _id: "$eventId",
                count: { $sum: 1 },
              },
            },
          ],
          as: "ticketCount",
        },
      },
      {
        $addFields: {
          ticketCount: {
            $arrayElemAt: ["$ticketCount.count", 0],
          },
        },
      },
      {
        $sort: {
          [sort]: order === "asc" ? 1 : -1,
        },
      },
      {
        $skip: (Number(page) - 1) * Number(limit),
      },
      {
        $limit: Number(limit),
      },
    ])
    .toArray();

  const eventsCount = await db.collection("events").countDocuments();

  res.json({
    events,
    count: eventsCount,
    totalPages: Math.ceil(eventsCount / limit),
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
