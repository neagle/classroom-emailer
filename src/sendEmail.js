const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = (recipient, subject, text) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      })
    );

    const mailOptions = {
      from: "Nate Eagle <n.eagle@gmail.com>",
      subject,
      text
    };

    if (process.env.sendToRealPeople !== "true") {
      // Send a real email, but only to me
      mailOptions.to = "n.eagle@gmail.com";
      console.log("If sent to real people, would be send to", recipient);
    } else {
      mailOptions.to = recipient;
      mailOptions.cc = "chiara.monticelli@gmail.com, n.eagle@gmail.com";
    }

    if (process.env.debug === "true") {
      console.log("MAIL OPTIONS", mailOptions);
      resolve(mailOptions);
    } else {
      transporter.sendMail(mailOptions, function(error, info) {
        // console.log("error", error, "info", info);
        if (error) {
          const response = {
            statusCode: 500,
            body: JSON.stringify({
              error: error.message
            })
          };
          console.log("RESPONSE", response);
          reject(response);
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify({
            message: `Email processed succesfully!`
          })
        };
        console.log("RESPONSE", response);
        resolve(response);
      });
    }
  });
};
