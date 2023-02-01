const orderid = require("order-id")(process.env.BASE_SECRET);
import cloudinaryLib from "./cloudinaryLib";
import dateNowUnix from "@/utils/dateNowUnix";
const QRCode = require("qrcode");
import { encode } from "js-base64";

const ticketsLib = {
  generateOrderId: () => {
    return orderid.generate();
  },
  generateQrCode: async (ticketData) => {
    try {
      //base64 encode ticketData
      const data = encode(JSON.stringify(ticketData));
      const qrCode = await QRCode.toDataURL(data);
      return qrCode;
    } catch (error) {
      "error generating qr code", error;
      return;
    }
  },
  generateTicketImageText: ({
    userName,
    ticketQuantity,
    ticketType,
    event,
    startTimeLocalText,
  }) => {
    const userNameText = userName ? userName.toUpperCase() : "NO NAME";
    const quantityText =
      ticketQuantity > 1
        ? `${ticketQuantity} ENTRADAS `
        : `${ticketQuantity} ENTRADA `;

    let ticketTypeText = "";
    switch (ticketType) {
      case "attendees":
        ticketTypeText = "DE ASISTENTE";
        break;
      case "participants":
        ticketTypeText = "DE PARTICIPANTE";
        break;
      default:
        ticketTypeText = "";
    }

    const placeNameText = `${event.placeName}`;
    const placeCityText = `${event.placeCity} ${event.placeState} ${event.placeCountry}`;
    const dateText = `${startTimeLocalText}`;

    const text = `${
      event.name
    } %0A %0A${quantityText}${ticketTypeText}%0A${userNameText} %0A %0A${`LUGAR Y FECHA:`} %0A${placeNameText}%0A${placeCityText}%0A${dateText}`;

    return text;
  },
  generateTicket: async (
    db,
    ticketData,
    startTimeLocalText,
    about,
    shirtSize,
    ipnStudent,
    ipnUnit,
    computerNeeded
  ) => {
    const {
      event,
      user,
      ticketType,
      stripeSession,
      ticketQuantity = 1,
    } = ticketData;
    try {
      //generate qr and upload to cloudinary
      const orderId = await ticketsLib.generateOrderId(db);
      const userId = user._id.toString();
      const eventId = event._id.toString();
      const qr = await ticketsLib.generateQrCode({
        orderId,
        eventId,
        ticketType,
        user: {
          email: user.email,
          name: user.name,
        },
      });

      //generate ticket image text
      // const ticketImageText = ticketsLib.generateTicketImageText({
      //   userName: user.name,
      //   ticketQuantity,
      //   event,
      //   startTimeLocalText,
      //   ticketType,
      // });

      // //upload qr to cloudinary
      // const qrUrl = await cloudinaryLib.uploadQrTicket(
      //   qr,
      //   orderId,
      //   ticketImageText
      // );

      const ticket = {
        ticketType,
        eventId: eventId,
        orderId,
        // qrUrl,
        ticketQuantity,
        userEmail: user.email,
        user: {
          id: userId,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        about: about ? about : "",
        shirtSize: shirtSize ? shirtSize : "",
        stripeSession: stripeSession || false,
        createdAt: dateNowUnix(),
        updatedAt: dateNowUnix(),
        expiresAt: event.endTime + 3600 * 24, //1 day after the event ends
        ipnStudent: ipnStudent ? ipnStudent : false,
        ipnUnit: ipnUnit ? ipnUnit : "",
        computerNeeded: computerNeeded ? computerNeeded : false,
      };

      // //save ticket in db and return ticket
      const ticketSaved = await db.collection("tickets").insertOne(ticket);
      if (!ticketSaved) {
        throw new Error(
          JSON.stringify({
            message: {
              es: "Error al registrar ticket",
              en: "Error registering ticket",
            },
          })
        );
      }

      return ticket;
    } catch (error) {
      console.error("error generating ticket", error);
      throw error;
    }
  },

  getTicketFromQr: async (db, qrData) => {
    //validate qr ticket, is if valid return ticket data
    try {
      const { orderId, eventId, user } = qrData;
      //get ticket that matches orderId, eventId and user email
      const ticket = await db
        .collection("tickets")
        .findOne({ orderId, eventId, userEmail: user.email });

      if (!ticket) {
        throw new Error(
          JSON.stringify({
            message: {
              es: "Ticket no existente",
              en: "Ticket does not exist",
            },
          })
        );
        return;
      }
      return ticket;
    } catch (error) {
      console.error("error getting ticket from qr", error);
      throw new Error(
        JSON.stringify({
          message: {
            es: "Ticket no existente",
            en: "Ticket does not exist",
          },
        })
      );
    }
  },
  isTicketExpired: (expiresAt) => {
    const now = dateNowUnix();
    if (now > expiresAt) {
      return true;
    } else {
      return false;
    }
  },
};

export default ticketsLib;
