import nodemailer from "nodemailer";

interface MailOptions {
  email: string;
  text: string;
  subject: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async ({ email, text, subject }: MailOptions) => {
  await transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: email,
    subject: subject,
    text,
  });
};

export default sendMail;
