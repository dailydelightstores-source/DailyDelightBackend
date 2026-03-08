import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // your Brevo login email
    pass: process.env.EMAIL_PASS  // Brevo SMTP key
  }
});

const sendmail = async (to, subject, html) => {

  const emailstatus = await transporter.sendMail({
    from: `"Daily Delight" <noreply@dailydelight.co.in>`,
    to: to,
    subject: subject,
    html: html
  });

  return emailstatus;
};

export default sendmail;