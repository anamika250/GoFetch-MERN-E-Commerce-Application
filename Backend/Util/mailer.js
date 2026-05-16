const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "GoFetch <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email sent:", data);

    return { success: true };
  } catch (error) {
    console.error("Mail failed:", error);

    return { success: false, error };
  }
};

module.exports = { sendMail };