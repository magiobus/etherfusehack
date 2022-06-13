//STORES API ROUTE to check availability of storeslug (for logged in users)
import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/utils/ncoptions";
import usersLib from "@/lib/usersLib";
import eventsLib from "@/lib/eventsLib";
import notificationsLib from "@/lib/notificationsLib";
const { ObjectId } = require("mongodb");

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //connects to database
  const client = await clientPromise;
  req.db = client.db();
  next();
});

//checks if email is already registred as a user
handler.post(async (req, res) => {
  const db = req.db;
  const data = req.body;
  const { email, name, phone, about, eventId } = req.body;

  try {
    //check if user exists or create one
    const user = await usersLib.userExistsOrCreate(db, req.body);
    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(data.eventId) });

    if (!event) res.status(404).send("Event not found");

    const registered = await eventsLib.registerUserForEvent(db, event, {
      ...user,
      about,
    });

    res.status(200).json({
      user,
      eventId,
      orderId: registered.orderId,
      message: {
        es: "Usuario registrado para el evento",
        en: "User registered for the event",
      },
    });

    //send email to user with confirmation number?...
    const mailData = {
      data: {
        user,
        orderId: registered.orderId,
        event,
      },
      receiversList: [user.email],
    };

    await notificationsLib.sendRegisterEmail(mailData);

    //TODO:
    //send whatsapp message to user (this would be nice)
  } catch (error) {
    console.log("error", error);
    const parsedError = JSON.parse(error.message);
    res.status(500).json(parsedError);
  }
});

export default handler;