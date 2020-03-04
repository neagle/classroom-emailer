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
        const familyNames = Array.isArray(family.name)
          ? [...family.name]
          : [family.name];
        const familyNamesRegExps = familyNames.map(name =>
          RegExp(`^${name}`, "i")
        );

        return familyNamesRegExps.some(re => re.test(notification.family));
      });
    }

    notification.recipient = (recipient.length && recipient[0].emails) || [];

    if (notification.family && !notification.recipient.length) {
      // If there's a family signed up, but we don't have an email match for
      // them, send a message to the admin
      const { ADMIN = "" } = process.env;
      notification.recipient = ADMIN.split(",");
      notification.text = `Right now, ${
        notification.family
      } has signed up for ${notification.service} on ${format(
        notification.serviceDate,
        dateFormat
      )}, but we don’t have an email match for them and can’t send them a reminder.\n\nSignup Sheet: https://docs.google.com/spreadsheets/d/${
        process.env.SPREADSHEET_KEY
      }`;
    } else if (!notification.recipient.length) {
      // If there are no recipients, no one has signed up: we need to send the
      // message to the room parents
      const { ROOM_PARENTS = "" } = process.env;
      notification.recipient = ROOM_PARENTS.split(",");
      notification.text = `Right now, no one has signed up for ${
        notification.service
      } on ${format(
        notification.serviceDate,
        dateFormat
      )}.\n\nSignup Sheet: https://docs.google.com/spreadsheets/d/${
        process.env.SPREADSHEET_KEY
      }`;
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
