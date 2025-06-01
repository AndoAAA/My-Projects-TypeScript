"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailOnBooking = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const nodemailer = __importStar(require("nodemailer"));
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
exports.sendMailOnBooking = (0, firestore_1.onDocumentCreated)("bookings/{bookingId}", async (event) => {
    if (!event.data) {
        console.error("No event data found");
        return;
    }
    const data = event.data.data();
    if (!data) {
        console.error("No booking data found");
        return;
    }
    const createdAt = data.createdAt && typeof data.createdAt.toDate === "function"
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
    }
    catch (error) {
        console.error("Email ուղարկումը ձախողվեց:", error);
    }
});
