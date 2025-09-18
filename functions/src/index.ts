import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as nodemailer from "nodemailer";

const GMAIL_USER = "spectraclinicarmenia@gmail.com";
const GMAIL_PASS = "npuf hdsm wpub onrg";
const ADMIN_EMAIL = "spectraclinicarmenia@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

export const sendMailOnBooking = onDocumentCreated(
  "bookings/{bookingId}",
  async (event) => {
    if (!event.data) {
      console.error("No event data found");
      return;
    }
    const data = event.data.data();
    if (!data) {
      console.error("No booking data found");
      return;
    }

    const createdAt =
      data.createdAt && typeof data.createdAt.toDate === "function"
        ? data.createdAt.toDate().toLocaleString()
        : "Տվյալ չկա";

    const mailOptions = {
      from: `"Կլինիկայի կայք" <${GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: "Նոր հերթագրման հայտ կայքում",
      text: `
Նոր հերթագրման հայտ է ստացվել կայքում։

Անուն: ${data.name}
Հեռախոսահամար: ${data.phone}
Նշումներ: ${data.note || "Ոչ մի նշում"}
Ժամանակ: ${createdAt}
    `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email-ն ուղարկվել է ադմինին");
    } catch (error) {
      console.error("Email ուղարկումը ձախողվեց:", error);
    }
  }
);
