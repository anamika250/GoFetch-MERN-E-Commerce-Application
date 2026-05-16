const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey =
  defaultClient.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance =
  new SibApiV3Sdk.TransactionalEmailsApi();

const sendMail = async (mailOptions) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: {
        email: "gofetch783@gmail.com",
        name: "GoFetch",
      },

      to: [
        {
          email: mailOptions.to,
        },
      ],

      subject: mailOptions.subject,

      htmlContent: mailOptions.html,
    });

    console.log("MAIL SUCCESS");

    return {
      success: true,
    };
  } catch (error) {
    console.log("MAIL ERROR:", error);

    return {
      success: false,
      error,
    };
  }
};

module.exports = { sendMail };