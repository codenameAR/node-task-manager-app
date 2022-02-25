const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'arathulramesh@gmail.com',
//     from: 'arathulramesh@gmail.com',
//     subject: 'This is my First Test mail!.',
//     text: 'I hope this one actually gets to you...'
// })

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
    to: email,
    from: 'arathulramesh@gmail.com',
    subject: 'Welcome aboard to the Task Manager App.',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app!` 
})
}



const sendCancellationEmail = (email, name)=>{
    sgMail.send({
    to: email,
    from: 'arathulramesh@gmail.com',
    subject: 'Goodbye from the Task Manager App.',
    text: `Farewell, ${name}. Hope to see you sometime back soon. Let me know if there is anything that i could have done to make the app better. Thanks!` 
})
}



module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}