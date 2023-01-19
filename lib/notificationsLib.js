//ACTIONS FOR NOTIFICATIONS
import newRegisterTemplate from "@/utils/emailtemplates/newRegister";
import { HOST } from "@/utils/host";
import { createBot } from "whatsapp-cloud-api";
const TOKEN = process.env.WHATSAPP_TOKEN;
const FROM = process.env.WHATSAPP_FROM;
import sendinblueLib from "./sendinblueLib";

const notificationsLib = {
  //send email notification of registration to event organizer
  async sendRegisterEmail(mailData) {
    const { data, receiversList } = mailData;
    const { user, ticket, event, startTimeLocalText } = data;

    const {
      placeName,
      placeAddress,
      placeCity,
      placeCountry,
      placeState,
      locationUrl,
    } = event;

    const { qrUrl, ticketType } = ticket;

    const dataForTemplate = {
      name: user.name || "",
      eventName: event.name || "",
      ticketType,
      qrUrl,
      startTimeLocalText,
      place: {
        name: placeName,
        address: placeAddress,
        city: placeCity,
        state: placeState,
        country: placeCountry,
        locationUrl: locationUrl,
      },
    };

    const options = {
      from: '"Etherfuse Hackathon" <hello@etherfuse.com>', // sender address
      to: receiversList, // list of receivers
      subject: `Tu registro para ${event.name}`, // Subject line
      html: newRegisterTemplate(dataForTemplate),
    };

    try {
      const response = await fetch(`${HOST}/api/sendemail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      if (response.status === 200) {
        console.info(`Order Email sent to ${receiversList}`);

        if (process.env.NODE_ENV === "production") {
          //updates user in sendinblue
          const sendinblueUser = {
            email: user.email,
            listIds: process.env.SENDINBLUE_LIST_IDS,
            attributes: {
              NAME: user.name || "",
            },
          };

          await sendinblueLib.createOrUpdateContact(sendinblueUser);
        }

        console.log("host", process.env.SMTP_HOST);
        console.log("user", process.env.SMTP_USER);
        console.log("pass", process.env.SMTP_PASS);
        console.log("SENDINBLUE_API_KEY", process.env.SENDINBLUE_API_KEY);
        console.log("SENDINBLUE_LIST_IDS", process.env.SENDINBLUE_LIST_IDS);
      } else {
        console.error(`Error Sending Email to ${receiversList}`, response);
      }
    } catch (error) {
      console.error("error at sendRegisterEmail =>", error);
      console.error(`Error Sending Email to ${receiversList}`);
    }
  },
  async sendDiscordEmail(mailData) {
    const { data, receiversList } = mailData;
    const { user, discordLink } = data;

    const options = {
      from: '"Etherfuse Hackathon" <hello@etherfuse.com>', // sender address
      to: receiversList, // list of receivers
      subject: `Bienvenido al evento!`, // Subject line
      html: `<h1>Hola ${user.name}!</h1> <p>Gracias por asistir al evento</p> <p>Para ingresar al server de discord, por favor ingresa al siguiente link: <a href="${discordLink}">${discordLink}<a/></p>`,
    };

    try {
      const response = await fetch(`${HOST}/api/sendemail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      if (response.status === 200) {
        console.info(`Discord Email sent to ${receiversList}`);
      } else {
        console.error(
          `Error Sending Discord Email to ${receiversList}`,
          response
        );
      }
    } catch (error) {
      console.error("error at sendDiscordEmail =>", error);
      console.error(`Error Sending Discord Email to ${receiversList}`);
    }
  },
  async sendWhatsappTemplate({ to, template, locale, components }) {
    try {
      if (!to || !template || !locale || !components) {
        throw new Error(
          "Missing params, need to specify an object with to, template, locale and components"
        );
      }

      const bot = createBot(FROM, TOKEN);
      const response = await bot.sendTemplate(to, template, locale, components);
      console.info("WA Message Sent =>", response);
      return response;
    } catch (error) {
      console.error("Error sending WA message =>", error);
      return error;
    }
  },

  async generateWhatsappTicketData({
    user,
    ticket,
    event,
    startTimeLocalText,
  }) {
    const waData = {
      to: user.phone.replace(/\D/g, ""),
      template: "etherfuse_hackathon_registration",
      locale: "es_MX",
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: `https://res.cloudinary.com/dqvwmfzal/image/upload/v1673568147/static/WhatsApp-Message_nj2fba.png`,
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: `${user?.name.split(" ")[0]}`,
            },
            {
              type: "text",
              text: `${event?.name}`,
            },
            {
              type: "text",
              text: `${startTimeLocalText}`,
            },
            {
              type: "text",
              text: `${event.placeName} - ${event.placeState}, ${event.placeCity} ${event.placeCountry}`,
            },
            {
              type: "text",
              text: `https://discord.gg/S3brFSH`,
            },
          ],
        },
      ],
    };
    return waData;
  },
};

export default notificationsLib;
