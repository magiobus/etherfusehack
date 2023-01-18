//projects API Route
import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import dateNowUnix from "@/utils/dateNowUnix";
import getCloudinary from "@/config/cloudinary";
import parsemultiPartyForm from "@/utils/parseMultiPartyForm";
const multer = require("multer");
import ncoptions from "@/config/ncoptions";
import { getSession } from "next-auth/react";
const { ObjectId } = require("mongodb");

const upload = multer({ dest: "/tmp" });
const handler = nc(ncoptions); //middleware next conect handler
const cloudinary = getCloudinary(); //gets configuration from utils/getcloudinary.js

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //gets session and connects to DB Client if authenticated
  //parses form data using multiparty
  try {
    await parsemultiPartyForm(req);
  } catch (error) {
    console.error("error parsing form data request", error);
    res.status(500).json({ error });
    return;
  }

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

//POST Project
handler.post(async (req, res) => {
  const db = req.db;
  const {
    name,
    description,
    eventId,
    liveUrl,
    problem,
    repoUrl,
    videoUrl,
    tech,
    whatsnext,
  } = req.body;

  try {
    //new object id
    const mongodbId = ObjectId();

    //take members_index_name from req.body and convert it to array of objects
    const members = [];
    const membersLength = 5;
    for (let i = 0; i < membersLength; i++) {
      const member = {
        name: req.body[`members_${i}_name`],
        email: req.body[`members_${i}_email`],
        discord: req.body[`members_${i}_discord`],
      };
      members.push(member);
    }

    const project = {
      _id: mongodbId,
      name,
      description,
      eventId,
      liveUrl,
      problem,
      repoUrl,
      videoUrl,
      tech,
      members: members || [],
      createdBy: req.sessionUser.id,
      updatedAt: dateNowUnix(),
      createdAt: dateNowUnix(),
      whatsnext,
    };

    //uploads photo to cloudinary if available
    //update user profile picture in cloudinary
    if (req.files) {
      //setting up multer for uploads to cloudinary
      const { photo } = req.files;
      if (photo) {
        upload.single("photo");
        try {
          const photoUpload = await cloudinary.uploader.upload(photo[0].path, {
            folder: `projects_${process.env.NODE_ENV}`,
            public_id: `${mongodbId.toString()}`,
            overwrite: true,
            width: 512,
            height: 512,
            crop: "fill",
            format: "jpg",
          });
          project.photo = photoUpload.secure_url;
        } catch (error) {
          console.error("error uploading project image to cloudinary", error);
        }
      }
    }

    //creates the project in db
    await db.collection("projects").insertOne(project);
    res.status(200).json(project);
  } catch (error) {
    console.error("error creating project", error.message);
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
