const familyEmails = require("./familyEmails");
const emailTemplates = require("./emailTemplates");
const sendEmail = require("./sendEmail");
const { format } = require("date-fns");

const dateFormat = "EEEE, MMMM do";

module.exports = notifications => {
  notifications.forEach(notification => {
    const recipient = familyEmails.filter(family => {
      const re = new RegExp(`^${family.name}`, "i");

      return re.test(notification.family);
    });

    notification.recipient = (recipient.length && recipient[0].emails) || [];

    // If there are no recipients, no one has signed up: we need to send the message to the room parents
    if (!notification.recipient.length) {
      notification.recipient = process.env.ROOM_PARENTS.split(",");
      notification.text = `Right now, no one has signed up for ${
        notification.service
      } on ${format(
        notification.serviceDate,
        dateFormat
      )}.\n\nSignup Sheet: https://docs.google.com/spreadsheets/d/1Sv5O-SB_oYS_hcJcK64MUPTUUcucEydIQqPLIb2hAI0/edit#gid=0`;
    } else {
      const message = emailTemplates.filter(template => {
        return template.service.test(notification.service);
      });
      notification.subject = message[0].subject;
      notification.text =
        message.length && message[0].text(notification.serviceDate).trim();
    }
  });

  return Promise.all(
    notifications.map(notification => {
      const { recipient, subject, text } = notification;
      return sendEmail(recipient.join(", "), subject, text);
    })
  );
};
