"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
const sendOtpEmail = async (username, otp) => {
    // create message body including code
    const htmlContent = `<h1>One-Time Passcode</h1>
        <p>Your code is:</p>
        <h2>${otp}</h2>
        <p>This code expires in 15 minutes</p>`;
    // send email
    await sendEmail({
        to: username,
        subject: 'Login Verification Code',
        html: htmlContent
    });
};
exports.sendOtpEmail = sendOtpEmail;
const sendEmail = async (params) => {
    try {
        const body = JSON.stringify({
            to: [params.to], // array of recipients allowed so []
            sender: process.env.MAIL_SENDER,
            subject: params.subject,
            html_body: params.html
        });
        const response = await fetch(`${process.env.SMTP2GO_SEND_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Smtp2go-Api-Key': process.env.SMTP2GO_API_KEY,
                'accept': 'application/json'
            },
            body: body
        });
        if (response.ok)
            console.log('Message Sent');
    }
    catch (error) {
        console.log(`sendEmail error: ${error}`);
        throw new Error(`sendEmail error: ${error}`);
    }
};
