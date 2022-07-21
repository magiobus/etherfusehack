//make a small library of actions
import dateNowUnix from "@/utils/dateNowUnix";
const orderid = require("order-id")(process.env.BASE_SECRET);

const eventsLib = {
  userIsAttendee: async (event, user) => {
    //check the event attendees array of objects if the user is already registered
    console.log("userIsAttendee", event, user);
    try {
      const eventAttendeesArray = event.attendees;
      //check if the user is already registered for the event
      const userIsAttendee = eventAttendeesArray.find((attendee) => {
        return attendee.userId.toString() === user._id.toString();
      });

      if (!userIsAttendee) return false;
      return true;
    } catch (error) {
      console.log("error in userIsAttendee function", error);
      return false;
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
      console.log("error at registerUserForEvent", error);
      throw error;
    }
  },
};

export default eventsLib;
