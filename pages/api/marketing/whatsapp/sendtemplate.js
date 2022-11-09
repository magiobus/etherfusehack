//sends participants list to whatsapp
import nc from "next-connect";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
import notificationsLib from "@/lib/notificationsLib";
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

//POST
handler.post(async (req, res) => {
  const waData = req.body;

  if (!waData) {
    res.status(400).json({ message: "no data" });
    return;
  }

  try {
    //send to whatsapp
    await notificationsLib.sendWhatsappTemplate(waData);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error("error at sendWhatsappTemplate =>", error);
    res.status(500).json({ message: "error sending whatsapp template" });
  }
});

export default handler;
