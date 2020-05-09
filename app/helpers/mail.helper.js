import fs from 'fs';

import config from '../config/config';
import transporter from '../config/mail';
import logger from './logger.helper';

/**
 * get templates
 *
 * @param template
 * @param data
 * @returns {boolean}
 */
const getTemplate = (templatePath, data) => {
    let templateView = fs.readFileSync(templatePath, 'utf8');
    if (templateView) {
        Object.keys(data).map(function (key,) {
            templateView = templateView.replace('{{' + key + '}}', data[key]);
        });
        return templateView;
    }
    return false;
};

/**
 * send mail helper function
 *
 * @param template
 * @param subject
 * @param toMail
 * @param data
 * @param attachments
 */
const sendMail = (template, subject, toMail, data = {}, attachments = []) => {
    const imgUrl = config.url + '/images/';
    const templatePath = config.appPath + 'views/emails/' + template + '.html';
    data.imgUrl = imgUrl;
    const templateView = getTemplate(templatePath, data);
    if (templateView) {
        const mailOptions = {
            from: config.mail.from,
            to: toMail,
            subject: config.name + ': ' + subject,
            html: templateView,
            attachments,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error('Function: SendMail | Template: ' + template + ' | Message: ', error);
            }
        });
    }
}

export default sendMail;