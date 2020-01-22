import { format } from "date-fns";

const dateFormat = "EEEE, MMMM do";

const footer = `
Please check the volunteer notes for additional info: https://docs.google.com/document/d/1EHAMm4UO9KyyDmVKj0h3gBRn4ZV75iQiudTd6HhsU-4/edit?usp=sharing

Gratefully,
Nate & Chiara
Ginkgo Class Room Parents at Lee Montessori
--

Signup Sheet: https://docs.google.com/spreadsheets/d/${process.env.SPREADSHEET_KEY}
`;

const familyEmailTemplates = [
  {
    // Friday laundry pick-up
    service: /^Friday/i,
    subject: "🧺 Ginkgo Laundry Reminder",
    text: serviceDate =>
      (
        `
Just sending a reminder that you have signed up for laundry duty this coming ${format(
          serviceDate,
          dateFormat
        )}. 

Thank you! Doing the class’s laundry is a huge help.
    ` + footer
      ).trim()
  },
  {
    // Wednesday home-made snack
    service: /^Wednesday/i,
    subject: "🍌 Ginkgo Homemade Snack Reminder",
    text: serviceDate =>
      (
        `
Just a friendly reminder to send in a nice homemade snack on ${format(
          serviceDate,
          dateFormat
        )}. 

Thank you! We really appreciate your help.
    ` + footer
      ).trim()
  },
  {
    // Monday drop off boquet of flowers and snacks
    service: /^Monday/i,
    subject: "🌷🍌 Ginkgo Flowers and Snacks Reminder",
    text: serviceDate =>
      (
        `
Just sending a reminder that you have signed up to bring in flowers and snacks this coming ${format(
          serviceDate,
          dateFormat
        )}. 

Thank you! We couldn’t do it without you.
    ` + footer
      ).trim()
  }
];

export default familyEmailTemplates;
