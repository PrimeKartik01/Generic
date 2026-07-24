import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // port 465 uses SSL
    auth: {

        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS

    }

});

const sendEnquiryEmail = async ({ name, phone, email }) => {

    const mailOptions = {

        from: `"Enquiry System" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: `New Enquiry from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 24px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 22px;">📋 New Enquiry Received</h1>
                </div>
                <div style="padding: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #666; font-weight: 600; width: 120px;">Name</td>
                            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #333;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #666; font-weight: 600;">Phone</td>
                            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #333;">
                                <a href="tel:${phone}" style="color: #1a73e8; text-decoration: none;">${phone}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #666; font-weight: 600;">Email</td>
                            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #333;">
                                <a href="mailto:${email}" style="color: #1a73e8; text-decoration: none;">${email || "Not provided"}</a>
                            </td>
                        </tr>
                    </table>
                    <p style="margin-top: 20px; font-size: 13px; color: #999; text-align: center;">
                        This enquiry was submitted via the website.
                    </p>
                </div>
            </div>
        `

    };

    await transporter.sendMail(mailOptions);

};

export { sendEnquiryEmail };
