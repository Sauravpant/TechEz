import nodemailer from "nodemailer";

interface MailOptions {
  email: string;
  otp: string;
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

const sendMail = async ({ email, otp, text, subject }: MailOptions) => {
  const textContent = `${text} Your OTP  is ${otp}. It will expire in 5 minutes.`;
  await transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: email,
    subject: subject,
    text: textContent,
  });
};

export default sendMail;
