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
handler.post(async (req, res) => {
  const { id } = req.query;
  const { id: userId } = req.sessionUser;
  const { phone, listToSend } = req.body;

  const db = req.db;
  if (id) {
    const event = await db.collection("events").findOne({ _id: ObjectId(id) });
    if (!event) {
      res.status(404).end("Event not found");
      return;
    }

    if (event.createdBy !== userId) {
      res.status(401).end("You don't have permission to do this");
      return;
    }

    //parse listToSend only using user.name and user.artistName
    const parsedListToSend = listToSend.map((ticket, index) => {
      return {
        index: index + 1,
        name: ticket?.user?.name || "",
        artistName: ticket?.user?.artistName || "",
      };
    });

    //convert to text
    const textToSend = parsedListToSend.reduce((acc, ticket) => {
      return `${acc}${ticket.index}.- ${ticket.artistName} (${ticket.name})  `;
    }, "");

    const waData = {
      to: phone,
      template: "patito_participants_list",
      locale: "es_MX",
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: `${event?.name}`,
            },
            {
              type: "text",
              text: `${textToSend}`,
            },
          ],
        },
      ],
    };

    //send to whatsapp
    await notificationsLib.sendWhatsappTemplate(waData);

    res.status(200).json({ message: "ok" });
  } else {
    //return error if no id
    res.status(400).end("No eventId provided");
  }
});

export default handler;
