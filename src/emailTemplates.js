const { format } = require("date-fns");

const dateFormat = "EEEE, MMMM do";

const footer = `
Please check the volunteer notes for additional info: https://docs.google.com/document/d/1EHAMm4UO9KyyDmVKj0h3gBRn4ZV75iQiudTd6HhsU-4/edit?usp=sharing

Gratefully,
Nate & Chiara

Signup Sheet: https://docs.google.com/spreadsheets/d/1Sv5O-SB_oYS_hcJcK64MUPTUUcucEydIQqPLIb2hAI0/edit#gid=0
`;

module.exports = [
  {
    // Friday laundry pick-up
    service: /^Friday/i,
    subject: "🧺 Laundry Reminder",
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
    subject: "🍌 Homemade Snack Reminder",
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
    subject: "🌷🍌 Flowers and Snacks Reminder",
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
