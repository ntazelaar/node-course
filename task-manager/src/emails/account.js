const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'
const myEmailAddress = 'nick@nicktazelaar.com'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myEmailAddress,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myEmailAddress,
        subject: 'Sorry to see you leave :(',
        text: `Goodbye ${name}, is there anything we could've done to keep you on board?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}