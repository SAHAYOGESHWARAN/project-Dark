const { google } = require('googleapis');

async function sendEmail(auth, email, subject, body) {
    const gmail = google.gmail({ version: 'v1', auth });
    
    const message = `From: your-email@example.com\r\n` +
                    `To: ${email}\r\n` +
                    `Subject: ${subject}\r\n\r\n${body}`;
    
    const encodedMessage = Buffer.from(message).toString('base64');
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMessage,
        },
    });
    
    return res.data;
}

module.exports = { sendEmail };
