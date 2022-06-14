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
handler.get(async (req, res) => {
  const { id } = req.query;
  const db = req.db;
  if (id) {
    //returns a single user with store basic data, if is owner of a store
    const event = await db.collection("events").findOne({ _id: ObjectId(id) });

    res.json(event);
  } else {
    //return error if no id
    res.status(400).end("No eventId provided");
  }
});

export default handler;
