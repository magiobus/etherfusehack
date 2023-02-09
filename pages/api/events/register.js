//STORES API ROUTE to check availability of storeslug (for logged in users)
import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/utils/ncoptions";
import usersLib from "@/lib/usersLib";
import eventsLib from "@/lib/eventsLib";
import ticketsLib from "@/lib/ticketsLib";
import notificationsLib from "@/lib/notificationsLib";
import sendinblueLib from "@/lib/sendinblueLib";

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
  const {
    about,
    eventId,
    startTimeLocalText,
    shirtSize,
    phone,
    phoneCountry,
    computerNeeded,
    ipnStudent,
    ipnUnit,
    isMinor,
  } = req.body;

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

    //checks if the user is already registered in the event
    //checks if the user is already an attendee
    const userIsAttendee = await eventsLib.userIsAttendee(
      db,
      event._id.toString(),
      user.email
    );
    if (userIsAttendee) {
      throw new Error(
        JSON.stringify({
          message: {
            es: "Ya estás registrado cómo asistente en este evento",
            en: "User is already registered as attendee for this event",
          },
        })
      );
    }

    //checks if the event is full for attendees
    const attendeesSoldOut = await eventsLib.attendeesSoldOut(
      db,
      event._id.toString()
    );

    if (attendeesSoldOut.soldOut) {
      throw new Error(
        JSON.stringify({
          message: {
            es: "Los registros para el evento se han agotado ",
            en: "Event is full for attendees",
          },
        })
      );
    }

    //generates ticket
    const ticketData = {
      event,
      user: { ...user, phone, phoneCountry },
      ticketType: "attendees",
      ticketQuantity: 1,
    };

    //Save ticket
    const ticket = await ticketsLib.generateTicket(
      db,
      ticketData,
      startTimeLocalText,
      about,
      shirtSize,
      ipnStudent,
      ipnUnit,
      computerNeeded,
      isMinor
    );

    try {
      // //send email to user with confirmation number?...
      const mailData = {
        data: {
          user,
          ticket,
          event,
          startTimeLocalText,
        },
        receiversList: [user.email],
      };

      await notificationsLib.sendRegisterEmail(mailData);
    } catch (error) {
      console.error("error sending email to user", error);
    }

    if (phone) {
      try {
        //send whatsapp message to user
        const waData = await notificationsLib.generateWhatsappTicketData({
          user,
          ticket,
          event,
          startTimeLocalText,
        });

        await notificationsLib.sendWhatsappTemplate(waData);
      } catch (error) {
        console.error("error sending whatsapp to user", error);
      }
    }

    //updates user in sendinblue
    if (process.env.NODE_ENV === "production") {
      try {
        await sendinblueLib.createOrUpdateContact({
          email: user.email,
          attributes: {
            EVENTNAME: event.name,
            ORDERID: ticket.orderId,
            ORDERPAGE: "hackathon.etherfuse.com",
          },
        });
      } catch (error) {
        console.error("error updating user in sendinblue", error);
      }
    }

    res.status(200).json({
      ticket,
      message: {
        es: "Usuario registrado para el evento",
        en: "User registered for the event",
      },
    });
  } catch (error) {
    console.error("error", error);
    const parsedError = JSON.parse(error.message);
    res.status(500).json(parsedError);
  }
});

export default handler;
