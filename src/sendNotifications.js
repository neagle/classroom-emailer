import familyEmails from "./familyEmails";
import familyEmailTemplates from "./familyEmailTemplates";
import teacherEmailTemplates from "./teacherEmailTemplates";
import sendEmail from "./sendEmail";
import { format } from "date-fns";

const dateFormat = "EEEE, MMMM do";

const sendNotifications = notifications => {
  notifications.forEach(notification => {
    let recipient;

    if (notification.teachers) {
      recipient = familyEmails.filter(family => family.name === "teachers");
    } else {
      recipient = familyEmails.filter(family => {
        const re = new RegExp(`^${family.name}`, "i");

        return re.test(notification.family);
      });
    }

    notification.recipient = (recipient.length && recipient[0].emails) || [];

    // If there are no recipients, no one has signed up: we need to send the message to the room parents
    if (!notification.recipient.length) {
      const { ROOM_PARENTS = "" } = process.env;
      notification.recipient = ROOM_PARENTS.split(",");
      notification.text = `Right now, no one has signed up for ${
        notification.service
      } on ${format(
        notification.serviceDate,
        dateFormat
      )}.\n\nSignup Sheet: https://docs.google.com/spreadsheets/d/1Sv5O-SB_oYS_hcJcK64MUPTUUcucEydIQqPLIb2hAI0/edit#gid=0`;
    } else {
      if (notification.teachers) {
        const message = teacherEmailTemplates.filter(template => {
          return template.service.test(notification.service);
        });

        notification.subject = `${message[0].subject} ${notification.family}`.trim();
        notification.text =
          message.length && message[0].text(notification.family);
      } else {
        const message = familyEmailTemplates.filter(template => {
          return template.service.test(notification.service);
        });

        notification.subject = `${notification.family} ${message[0].subject}`;
        notification.text =
          message.length && message[0].text(notification.serviceDate);
      }
    }
  });

  return Promise.all(
    notifications.map(notification => {
      const { recipient, subject, text } = notification;
      return sendEmail(recipient.join(", "), subject, text);
    })
  );
};

export default sendNotifications;
