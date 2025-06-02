import dotenv from 'dotenv'
import { createTransport } from 'nodemailer';

dotenv.config()

const transport = createTransport({
	host: process.env.SMTP_HOST, port: 465, secure: true,
	auth: {
		user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSKEY
	}
})

export const sendEmailFromVisora = async (
	to: string,
	subject: string,
	content: string
) => {
	await transport.sendMail({
		to: [to],
		from: process.env.SMTP_EMAIL,
		subject: subject,
		html: content
	})
}