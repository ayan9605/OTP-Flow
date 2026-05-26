const getEmailTemplate = (type, otp) => {
    const isRegister = type === 'register';
    
    const subject = isRegister 
        ? 'Welcome to Nodrix - Verify Your Account' 
        : 'Password Reset Request - Nodrix Security';
        
    const title = isRegister ? 'Welcome to Nodrix' : 'Password Reset Request';
    const subtitle = isRegister ? 'Verify your account' : 'Reset your password securely';
    const description = isRegister 
        ? 'Thank you for signing up! To complete your registration and verify your account, please use the verification code below.'
        : 'We received a request to reset your password. Please use the verification code below to securely reset your credentials. If you did not request this, please ignore this email.';

    const textVersion = `
${title}
${subtitle}

${description}

Your Verification Code: ${otp}

This code will expire in 5 minutes.
    `;

    const htmlVersion = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #333333; }
            .wrapper { width: 100%; background-color: #f4f4f7; padding: 40px 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
            .header { background-color: #1a1a1a; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 1px; }
            .content { padding: 40px 30px; text-align: center; }
            .content h2 { margin-top: 0; color: #1a1a1a; font-size: 20px; font-weight: 600; }
            .content p { color: #555555; font-size: 15px; line-height: 1.6; margin-bottom: 30px; }
            .otp-box { background-color: #f8f9fa; border: 2px dashed #cccccc; border-radius: 8px; padding: 20px; margin: 0 auto 30px auto; max-width: 250px; }
            .otp-code { font-size: 32px; font-weight: 700; color: #1a1a1a; letter-spacing: 5px; margin: 0; }
            .footer { background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eeeeee; }
            .footer p { margin: 0; color: #888888; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h1>NODRIX</h1>
                </div>
                <div class="content">
                    <h2>${subtitle}</h2>
                    <p>${description}</p>
                    <div class="otp-box">
                        <p class="otp-code">${otp}</p>
                    </div>
                    <p style="font-size: 13px; color: #888888;">This code will expire in 5 minutes.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Nodrix Enterprises. All rights reserved.</p>
                    <p>This is an automated message, please do not reply.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    return { subject, htmlVersion, textVersion };
};

module.exports = { getEmailTemplate };
