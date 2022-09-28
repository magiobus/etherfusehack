//Tickets readr frrom QR code
import nc from "next-connect";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
const { ObjectId } = require("mongodb");
import ncoptions from "@/config/ncoptions";
const handler = nc(ncoptions);
import ticketsLib from "@/lib/ticketsLib";
import eventsLib from "@/lib/eventsLib";
import notificationsLib from "@/lib/notificationsLib";
const discordLink = process.env.DISCORD_INVITE_LINK;

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //gets session and connects to DB Client if authenticated
  const session = await getSession({ req });

  if (
    (session && session.user.roles.includes("organizer")) ||
    session.user.roles.includes("admin")
  ) {
    req.sessionUser = session.user;
    req.organizerId = session.user.id;
    const client = await clientPromise;
    req.db = client.db();
    next();
  } else {
    res.status(401).end("You don't have permission to do this");
    return;
  }
});

//GET qr INFO
handler.post(async (req, res) => {
  const { eventId, orderId, ticketType, user, currentEventId } = req.body;
  const { db, organizerId } = req;

  try {
    //if ticket is not from current event
    if (eventId !== currentEventId) {
      res.status(404).json({
        message: {
          es: "El ticket no pertenece al evento actual",
          en: "Ticket does not belong to current event",
        },
      });
      return;
    }

    //get ticket using qr data
    const ticket = await ticketsLib.getTicketFromQr(db, {
      orderId,
      eventId,
      ticketType,
      user,
    });

    if (!ticket) {
      console.error("ticket no existe");
      res.status(404).json({
        message: {
          es: "No se encontró el ticket",
          en: "Ticket not found",
        },
      });
      return;
    }

    //if there's ticket, validate more stuff
    const { expiresAt, used } = ticket;

    //check if ticket is already used
    if (used) {
      res.status(400).json({
        message: {
          es: "El ticket ya fue usado",
          en: "Ticket already used",
        },
      });
      return;
    }

    //check if ticket is expired or not
    const isExpired = ticketsLib.isTicketExpired(expiresAt);
    if (isExpired) {
      console.error("ticket expirado");
      res.status(404).json({
        message: {
          es: "El ticket ha expirado",
          en: "Ticket expired",
        },
      });
      return;
    }

    // if user is not admin, check that event is owned by organizer
    const event = await eventsLib.getEvent(db, eventId);
    if (!req.sessionUser.roles.includes("admin")) {
      if (event.createdBy !== organizerId) {
        console.error("no eres el creador del evento");
        res.status(404).json({
          message: {
            es: "No eres el creador del evento",
            en: "This event does not belong to you",
          },
        });
        return;
      }
    }

    //if event is not free, and is attenddee check that ticket has stripe payment
    if (event.attendeePrice > 0 && ticketType === "attendees") {
      if (!ticket.stripeSession) {
        console.error("no hay pago de stripe");
        res.status(404).json({
          message: {
            es: "El Ticket no tiene un pago asociado",
            en: "This ticket does not have associated payment",
          },
        });
        return;
      }
    }

    // update ticket to used in DB
    await db.collection("tickets").updateOne(
      { _id: ObjectId(ticket._id) },
      {
        $set: {
          used: true,
        },
      }
    );

    //Send notification via email with discord link
    try {
      const mailData = {
        data: {
          user,
          discordLink,
        },
        receiversList: [user.email],
      };

      await notificationsLib.sendDiscordEmail(mailData);
    } catch (error) {
      console.error(error);
    }

    //send whatsapp message with discord link

    try {
      const waData = {
        to: ticket.user.phone.replace(/\D/g, ""),
        template: "event_discord_link",
        locale: "es_MX",
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${user?.name.split(" ")[0]}`,
              },
              {
                type: "text",
                text: `${discordLink}`,
              },
            ],
          },
        ],
      };
      await notificationsLib.sendWhatsappTemplate(waData);
    } catch (error) {
      console.error(error);
    }

    //return ticket info
    res.status(200).json(ticket);
  } catch (error) {
    //check if error has message property
    const parsedError = JSON.parse(error.message);
    if (parsedError.message) {
      res.status(404).json({
        message: parsedError.message,
      });
    } else {
      res.status(500).json({
        message: {
          es: "Ocurrió un error validando el ticket",
          en: "Error validating ticket",
        },
        error,
      });
    }
  }
});

export default handler;
