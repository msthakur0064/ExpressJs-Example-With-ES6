import nodeMailer from 'nodemailer';

import config from './config';

const transporter = nodeMailer.createTransport({
    pool: false,
    service: config.mail.service,
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass,
    },
});

export default transporter;