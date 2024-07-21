import { getFirstSmtpConnection } from '@/data/smtp';
import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | undefined;

async function initializeTransporter() {
  try {
    const connectionValues = await getFirstSmtpConnection();
    if(!connectionValues) throw new Error('No SMTP connection found');
    transporter = nodemailer.createTransport({
      host: connectionValues.servername,
      port: Number(connectionValues.port),
      secure: true,
      auth: {
        user: connectionValues.username,
        pass: connectionValues.password
      }
    });
  } catch (error) {
    console.error('Error initializing transporter:', error);
    throw error;
  }
}

/**
 * Sends an email.
 * @param to - The recipient's email address.
 * @param from - The sender's email address.
 * @param subject - The subject of the email.
 * @param html - The HTML content of the email.
 */
export async function sendMail(to: string, from: string, subject: string, html: string) {
  try {
    if (!transporter) {
      await initializeTransporter();
    }

    const connectionValues = await getFirstSmtpConnection();
    const info = await transporter!.sendMail({
      from: `${connectionValues?.displayname} <${connectionValues?.from ?? from}>`,
      to:connectionValues?.to ?? to,
      subject,
      html
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
