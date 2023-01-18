//Stats API ROUTE for logged in users
import nc from "next-connect";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
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
    res.status(401).end("No tienes permiso para esta acción");
    return;
  }
});

//GET STATS
handler.get(async (req, res) => {
  const db = req.db;
  //returns count of users
  const users = await db.collection("users").countDocuments();
  const events = await db.collection("events").countDocuments();
  const tickets = await db.collection("tickets").countDocuments();

  //get tickets and sum tshirt size count
  const tshirtSizes = await db
    .collection("tickets")
    .aggregate([
      {
        $group: {
          _id: "$shirtSize",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const parsedTshirtSizes = tshirtSizes.map((item) => {
    return {
      name: item._id,
      nameEs: item._id,
      stat: item.count,
    };
  });

  //get t shirt info of every event and sum tshirt size count
  const eventTshirtSizes = await db
    .collection("events")
    .aggregate([
      {
        $match: {},
      },
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
                _id: "$shirtSize",
                count: { $sum: 1 },
              },
            },
          ],
          as: "ticketCount",
        },
      },
    ])
    .toArray();

  const stats = [
    {
      name: "GlobalStats",
      values: [
        { name: "users", nameEs: "usuarios 👩‍👦‍👦", stat: users },
        { name: "events", nameEs: "eventos 🎤", stat: events },
        { name: "tickets", nameEs: "tickets 🎟", stat: tickets },
      ],
    },
    { name: "TshirtSizes", values: parsedTshirtSizes },
    { name: "EventTshirtSizes", values: eventTshirtSizes },
  ];

  return res.json(stats);
});

export default handler;
