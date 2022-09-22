//EVENTS API ROUTE for logged in users
import nc from "next-connect";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
const { ObjectId } = require("mongodb");
import ncoptions from "@/config/ncoptions";
const handler = nc(ncoptions);
import ticketsLib from "@/lib/ticketsLib";

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //gets session and connects to DB Client if authenticated
  const session = await getSession({ req });
  if (session && session.user.roles.includes("organizer")) {
    req.sessionUser = session.user;
    const client = await clientPromise;
    req.db = client.db();
    next();
  } else {
    res.status(401).end("You don't have permission to do this");
    return;
  }
});

//GET EVENT if it has an ID with tickets info and is created by the current user
handler.get(async (req, res) => {
  const { id } = req.query;
  const { id: userId } = req.sessionUser;

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
            createdBy: userId,
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
    const [participants, attendees] = [[], []];
    tickets.forEach((ticket) => {
      if (ticket.ticketType === "participants") {
        participants.push(ticket);
      } else if (ticket.ticketType === "attendees") {
        attendees.push(ticket);
      }
    });

    event.tickets = {
      participants,
      attendees,
    };

    //calculate stats for tickets info and add to event object
    const ticketStats = await ticketsLib.calculateTicketStatsByEventId(db, id);
    event.stats = {
      tickets: ticketStats,
    };

    res.json(event);
  } else {
    //return error if no id
    res.status(400).end("No eventId provided");
  }
});

export default handler;
