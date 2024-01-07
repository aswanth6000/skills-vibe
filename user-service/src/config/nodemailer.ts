import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
console.log( EMAIL_PASSWORD);


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
})

export default transporter;