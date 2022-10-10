//GET TICKETS for logged in user
import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/config/ncoptions";
import { getSession } from "next-auth/react";
const { ObjectId } = require("mongodb");

const handler = nc(ncoptions); //middleware next conect handler

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //gets session and connects to DB Client if authenticated
  //get session to check access
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

//GET USER Tickets
handler.get(async (req, res) => {
  const { id, page, sort, order, limit } = req.query;
  const { id: sessionId, email } = req.sessionUser;
  const db = req.db;

  if (!page || !sort || !order || !limit) {
    res
      .status(400)
      .end("You need to provide page, sort and order query params");
    return;
  }

  if (id == sessionId) {
    const tickets = await db
      .collection("tickets")
      .aggregate([
        {
          $match: {
            userEmail: email,
          },
        },
        {
          $sort: {
            [sort]: order == "asc" ? 1 : -1,
          },
        },
        {
          $skip: (page - 1) * Number(limit),
        },
        {
          $limit: Number(limit),
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

    //get count of all tickets of user
    const userTicketsCount = await db
      .collection("tickets")
      .countDocuments({ userEmail: email });

    res.json({
      tickets,
      count: userTicketsCount,
      totalPages: Math.ceil(userTicketsCount / limit),
    });
  } else {
    console.error(
      "Can´t read profile, id from query does not match session id"
    );
    res.status(401).end("You are trying to read a different user profile");
  }
});

export default handler;
