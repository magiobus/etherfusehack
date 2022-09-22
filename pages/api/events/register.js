//STORES API ROUTE to check availability of storeslug (for logged in users)
import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/utils/ncoptions";
import usersLib from "@/lib/usersLib";
import eventsLib from "@/lib/eventsLib";
import ticketsLib from "@/lib/ticketsLib";
import notificationsLib from "@/lib/notificationsLib";

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
  const { about, eventId, ticketType, startTimeLocalText } = req.body;

  try {
    //check if user exists or create one
    const user = await usersLib.userExistsOrCreate(db, req.body);

    if (!user) {
      res.status(400).json({
        message: {
          es: "Ocurrió un error registrando al usuario (400)",
          en: "Error registering user (400)",
        },
      });
    }

    //gets event
    const event = await eventsLib.getEvent(db, eventId);
    if (!event) res.status(404).send("Event not found");

    //TODO: check if the user is already registered in the event
    // TODO: Check if the event is full

    //generates ticket
    const ticketData = {
      event,
      user: { ...user },
      ticketType: "attendees",
      ticketQuantity: 1,
    };

    console.log("ticketData", ticketData);

    //Save ticket
    const ticket = await ticketsLib.generateTicket(
      db,
      ticketData,
      startTimeLocalText,
      about
    );

    res.status(200).json({
      ticket,
      message: {
        es: "Usuario registrado para el evento",
        en: "User registered for the event",
      },
    });

    // //send email to user with confirmation number?...
    // const mailData = {
    //   data: {
    //     user,
    //     orderId: registered.orderId,
    //     event,
    //     startTimeLocalText,
    //   },
    //   receiversList: [user.email],
    // };

    // await notificationsLib.sendRegisterEmail(mailData);

    //TODO:
    //send whatsapp message to user (this would be nice)
  } catch (error) {
    console.log("error", error);
    const parsedError = JSON.parse(error.message);
    res.status(500).json(parsedError);
  }
});

export default handler;
