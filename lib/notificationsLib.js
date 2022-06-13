//ACTIONS FOR NOTIFICATIONS

import newRegisterTemplate from "@/utils/emailtemplates/newRegister";
import { HOST } from "@/utils/host";
import unixToFormat from "@/utils/unixToFormat";

const notificationsLib = {
  //send email notification of registration to event organizer
  async sendRegisterEmail(mailData) {
    const { data, receiversList } = mailData;
    const { user, orderId, event } = data;

    const dataForTemplate = {
      name: user.name,
      eventName: event.name,
      orderId,
      startTime: unixToFormat(event?.startTime, "PPPPp"),
      place: event.place,
    };

    const options = {
      from: '"Super Happy Dev House MX" <superhappydevhousemx@gmail.com>', // sender address
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
        console.log(`Order Email sent to ${receiversList}`);
      } else {
        console.log(`Error Sending Email to ${receiversList}`, response);
      }
    } catch (error) {
      console.log("error at sendRegisterEmail =>", error);
      console.log(`Error Sending Email to ${receiversList}`);
    }
  },
};

export default notificationsLib;
