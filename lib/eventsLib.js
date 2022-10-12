//make a small library of actions
import dateNowUnix from "@/utils/dateNowUnix";
const orderid = require("order-id")(process.env.BASE_SECRET);
import { ObjectId } from "mongodb";

const eventsLib = {
  userIsAttendee: async (db, eventId, email) => {
    //check if a ticket exists with ticketType "attendees", eventId and user object has same email}
    try {
      const ticket = await db.collection("tickets").findOne({
        ticketType: "attendees",
        eventId,
        userEmail: email,
      });

      if (!ticket) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("error checking if user is attendee", error);
      throw error;
    }
  },
  registerUserForEvent: async (db, event, user) => {
    const { name, phone, email, about } = user;

    //check if the user is already registred for the event using userIsAttendee functino
    try {
      const userIsAttendee = await eventsLib.userIsAttendee(event, user);
      if (userIsAttendee) {
        throw new Error(
          JSON.stringify({
            message: {
              es: "El usuario ya está registrado para este evento",
              en: "User is already registered for this event",
            },
          })
        );
      }

      //if not atendee, add the user to the event attendees array
      const eventAttendeesArray = event.attendees;
      const newAttendee = {
        userId: user._id,
        name: name,
        email: email,
        phone: phone,
        about: about,
        registeredAt: dateNowUnix(),
        orderId: orderid.generate(),
      };
      eventAttendeesArray.push(newAttendee);

      // //update the event with the new attendees array
      const updatedEvent = await db
        .collection("events")
        .findOneAndUpdate(
          { _id: event._id },
          { $set: { attendees: eventAttendeesArray } },
          { returnOriginal: false }
        );

      return {
        event: updatedEvent.value,
        orderId: newAttendee.orderId,
      };
    } catch (error) {
      console.error("error at registerUserForEvent", error);
      throw error;
    }
  },
  getEvent: async (db, eventId) => {
    try {
      const event = await db
        .collection("events")
        .findOne({ _id: ObjectId(eventId) });
      return event;
    } catch (error) {
      console.error("error at getEvent", error.message);
      throw error;
    }
  },
  attendeesSoldOut: async (db, eventId) => {
    //check if the event has no tickets with ticketType "participants" and eventId
    try {
      //get event
      const event = await eventsLib.getEvent(db, eventId);

      //get count of tickets using ticketType "attendees", eventId and ticketQuantity and aggregate
      const countArray = await db
        .collection("tickets")
        .aggregate([
          {
            $match: {
              ticketType: "attendees",
              eventId,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$ticketQuantity" },
            },
          },
        ])
        .toArray();

      let count = 0;
      if (countArray.length > 0) {
        count = countArray[0].total;
      }

      if (count >= event.attendeeLimit) {
        return {
          soldOut: true,
          ticketsLeft: 0,
        };
      }

      return {
        soldOut: false,
        ticketsLeft: event.attendeeLimit - count,
      };
    } catch (error) {
      console.error("error checking if attendees are sold out", error.message);
      return false;
    }
  },
  parseEditEventData: async (req) => {
    try {
      const {
        name,
        description,
        locationUrl,
        isPublic,
        attendeeLimit,
        maxTeamSize,
        isGivingShirts,
      } = req.body;
      const eventData = {
        name,
        description,
        locationUrl,
        isPublic: isPublic === "true" ? true : false,
        isGivingShirts: isGivingShirts === "true" ? true : false,
        updatedAt: dateNowUnix(),
        attendeeLimit: parseInt(attendeeLimit) || 0,
        maxTeamSize: parseInt(maxTeamSize) || 5,
      };

      return eventData;
    } catch (error) {
      console.error("error at parseEditEventData", error.message);
      throw error;
    }
  },
};

export default eventsLib;
