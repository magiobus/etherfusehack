//projects API Route for editing
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

//GET Project
handler.get(async (req, res) => {
  const db = req.db;
  const { id } = req.query;

  //check that project id is valid and is owned by user
  try {
    const project = await db
      .collection("projects")
      .findOne({ _id: ObjectId(id), createdBy: req.sessionUser.id });

    if (!project) {
      res.status(404).end("Project not found");
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("error getting project", error);
    res.status(500).json({ error });
  }
});

//Edit user project
handler.put(async (req, res) => {
  const { id } = req.query;
  const { id: userId } = req.sessionUser;
  const db = req.db;

  //Check that project exists and belongs to user
  const project = await db.collection("projects").findOne({
    _id: ObjectId(id),
    createdBy: userId,
  });

  if (!project) {
    res.status(404).end("Project not found");
    return;
  }

  //parse data
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

  const projectParsed = {
    name,
    description,
    eventId,
    liveUrl,
    problem,
    repoUrl,
    videoUrl,
    tech,
    updatedAt: dateNowUnix(),
    whatsnext,
  };

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

  projectParsed.members = members;

  //update photo project if it exists
  if (req.files) {
    const { photo } = req.files;
    if (photo) {
      upload.single("photo");
      try {
        const photoUpload = await cloudinary.uploader.upload(photo[0].path, {
          folder: `projects_${process.env.NODE_ENV}`,
          public_id: `${id}`,
          overwrite: true,
          width: 512,
          height: 512,
          crop: "fill",
          format: "jpg",
        });
        projectParsed.photo = photoUpload.secure_url;
      } catch (error) {
        console.error("error uploading project image to cloudinary", error);
      }
    }
  }

  //update project
  try {
    await db
      .collection("projects")
      .updateOne({ _id: ObjectId(id) }, { $set: projectParsed });
    res.status(200).end("Project updated");
  } catch (error) {
    console.error("error updating project", error);
    res.status(500).json({ error });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
