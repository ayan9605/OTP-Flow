const transporter = require('../config/smtp');
const { getEmailTemplate } = require('../utils/emailTemplates');

const sendOtpEmail = async (email, otp, type) => {
    const { subject, htmlVersion, textVersion } = getEmailTemplate(type, otp);

    const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: email,
        subject: subject,
        text: textVersion,
        html: htmlVersion
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
