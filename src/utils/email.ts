import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // ваш email
    pass: process.env.SMTP_PASS, // ваш пароль
  },
});

export const sendConfirmationEmail = async (to: string, token: string) => {
  const url = `http://localhost:3000/users/confirm/${token}`;

  await transporter.sendMail({
    from: '"Book Collection" <no-reply@bookcollection.com>',
    to,
    subject: 'Подтверждение email',
    text: `Для подтверждения email перейдите по ссылке: ${url}`,
    html: `<p>Для подтверждения email перейдите по ссылке: <a href="${url}">${url}</a></p>`,
  });
};
