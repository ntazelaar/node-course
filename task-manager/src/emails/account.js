const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.MY_EMAIL_ADDRESS,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.MY_EMAIL_ADDRESS,
        subject: 'Sorry to see you leave :(',
        text: `Goodbye ${name}, is there anything we could've done to keep you on board?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}