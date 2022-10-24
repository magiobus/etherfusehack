//USERS API ROUTE for logged in users
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
    res.status(401).end("You don't have permission to do this");
    return;
  }
});

//GET USERS
handler.get(async (req, res) => {
  const db = req.db;

  const tickets = await db
    .collection("tickets")
    .find({})
    .project({
      userEmail: 1,
      user: 1,
      eventId: 1,
    })
    .toArray();

  //return only unique users and user key
  const users = [...new Set(tickets.map((ticket) => ticket.user))];

  //Delete duplicates in users using id as key
  const uniqueUsers = users.filter(
    (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
  );

  res.json({
    users: uniqueUsers,
    count: uniqueUsers.length,
  });
});

export default handler;
