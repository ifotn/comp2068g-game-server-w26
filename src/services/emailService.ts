interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

const sendEmail = async (params: SendEmailParams): Promise<void> => {
    try {
        const body = JSON.stringify({ 
            to: [params.to],  // array of recipients allowed so []
            sender: process.env.MAIL_SENDER,
            subject: params.subject,
            html_body: params.html
        });

        const response: Response = await fetch(`${process.env.SMTP2GO_SEND_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Smtp2go-Api-Key': process.env.SMTP2GO_API_KEY,
                'accept': 'application/json'
            },
            body: body
        });

        if (response.ok) console.log('Message Sent');
    }
    catch (error) {
        console.log(`sendEmail error: ${error}`);
        throw new Error(`sendEmail error: ${error}`);
    }
};
