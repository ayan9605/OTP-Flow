const getEmailTemplate = (type, otp) => {
    const isRegister = type === 'register';
    
    const subject = isRegister 
        ? 'Welcome to Nodrix - Verify Your Account' 
        : 'Password Reset Request - Nodrix Security';
        
    const subtitle = isRegister ? 'Verify your account' : 'Reset your password securely';
    const description = isRegister 
        ? 'Thank you for signing up! To complete your registration, please use the verification code below.'
        : 'We received a password reset request. Use the code below to securely reset your credentials. Ignore if not requested.';

    const textVersion = `NODRIX\n${subtitle}\n\n${description}\n\nCode: ${otp}\n\nExpires in 5 minutes.`;

    // Ultra-lightweight, strictly inline-styled HTML
    const htmlVersion = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:20px;font-family:sans-serif;background:#f4f4f7;color:#333;text-align:center;">
        <div style="max-width:450px;margin:0 auto;background:#fff;border-radius:8px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
            <h1 style="color:#1a1a1a;margin:0 0 20px 0;letter-spacing:1px;">NODRIX</h1>
            <h2 style="font-size:18px;margin-top:0;">${subtitle}</h2>
            <p style="color:#555;line-height:1.5;font-size:15px;">${description}</p>
            <div style="background:#f8f9fa;border:2px dashed #ccc;border-radius:6px;padding:15px;margin:25px auto;width:180px;">
                <span style="font-size:28px;font-weight:700;letter-spacing:4px;color:#1a1a1a;">${otp}</span>
            </div>
            <p style="font-size:12px;color:#888;margin-bottom:0;">
                Expires in 5 minutes.<br><br>
                &copy; ${new Date().getFullYear()} Nodrix. Automated message, do not reply.
            </p>
        </div>
    </body>
    </html>
    `;

    return { subject, htmlVersion, textVersion };
};

module.exports = { getEmailTemplate };
