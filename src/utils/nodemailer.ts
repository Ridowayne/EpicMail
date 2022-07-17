import nodemailer, { SendMailOptions } from 'nodemailer';

// async function sendEmail() {}
const sendEmail = async (
  email: string,
  passwordResetToken: string,
  resetURL: string
) => {
  const transport = nodemailer.createTransport({
    service: 'hotmail',

    auth: {
      user: 'ade_epick@outlook.com',
      pass: 'Google767',
    },
    // process.env.EMAIL_USERNAME,
    // process.env.EMAIL_PASSWORD,
  });

  const mailOptions = {
    from: 'Rilwn from Epic Mail <ade_epick@outlook.com>',
    to: email,
    subject: 'Reset password link',
    text: `Dear user Forgot your password? Submit a change of password request with your new password to: ${resetURL}.\nIf you didn't forget your password or request a password change, please ignore this email!`,
  };

  await transport.sendMail(mailOptions);
};

export default sendEmail;
