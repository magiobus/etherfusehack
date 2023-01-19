const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const options = req.body;

  if (req.method === "POST") {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASS, // generated ethereal password
      },
    });

    try {
      await transporter.sendMail(options);
      res.status(200).json({ success: "Email Sent " });
    } catch (error) {
      res.status(404).json({ error: "Fail sending email" });
    }
  } else {
    res.status(404).json({ error: "bad request" });
  }
}
