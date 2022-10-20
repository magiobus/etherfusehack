//GET PROJECTS for logged in user
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

//GET USER PROJECTs
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
    const projects = await db
      .collection("projects")
      .aggregate([
        {
          $match: {
            createdBy: sessionId,
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
      ])
      .toArray();

    //get count of all projects of user
    const userProjectsCount = await db
      .collection("projects")
      .countDocuments({ createdBy: sessionId });

    res.json({
      projects,
      count: userProjectsCount,
      totalPages: Math.ceil(userProjectsCount / limit),
    });
  } else {
    console.error(
      "[get projects projects] - user in session id is not same as id in query"
    );
    res.status(401).end("You are trying to read a different user projects");
  }
});

export default handler;
