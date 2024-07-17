import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    //@ts-ignore
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

/**
 * 
 * @param To 
 * @param From 
 * @param subject 
 * @param html 
 * 
 * Console the message log
 */
export async function sendMail(To: string, From:string,subject:string, html: string) {
    const info = await transporter.sendMail({
      from: `${From}`,
      to: To, 
      subject: subject, 
      html: html
    });
  
    console.log("Message sent: %s", info.messageId);
  }
  
  