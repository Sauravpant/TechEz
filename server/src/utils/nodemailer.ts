import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sauravpant777@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (email, otp) => {
  const textContent = `Hi , please use this verification code to confirm your account. Your verification code is ${otp}. It will expire in 10 minutes.`;
  const htmlContent = `
    <p>Hi , please use this verification code to confirm your account.</p> <p> Your verification code is <b>${otp}</b>.</p>
    <p>It will expire in 10 minutes. Please use it promptly.</p>
  `;
  await transporter.sendMail({
    from: "sauravpant777@gmail.com",
    to: email,
    subject: "Your Verification Code",
    text: textContent,
    html: htmlContent,
  });
};

export default sendMail;
