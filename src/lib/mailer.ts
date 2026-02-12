import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ReactElement } from "react";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  template: ReactElement;
}

export const sendEmail = async ({
  to,
  subject,
  template,
}: SendEmailOptions) => {
  try {
    const emailHtml = await render(template);

    const options = {
      from: `AgriLearn Nexus <${process.env.SMTP_SENDER}>`,
      to,
      subject,
      html: emailHtml,
    };

    const info = await transporter.sendMail(options);
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
