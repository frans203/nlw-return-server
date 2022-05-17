import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d298788327a68d",
    pass: "e80069ad87c3b3",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <teste@gmail.com>",
      to: "Francisco Santana <franciscosantana203@gmail.com>",
      subject,
      html: body,
    });
  }
}
