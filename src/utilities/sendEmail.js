import nodemailer from 'nodemailer';
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.PASSWORD
    },
});

const mailSend = async (inputs) => {
    let info = await transporter.sendMail({
        from: {
            "name":process.env.COMPANY,
            "address": process.env.GMAIL_ID
        },
        to: inputs.to,
        subject: inputs.subject,
        text: inputs.text,
    });
    if (info) {
        return true;
    }
};

export default mailSend;