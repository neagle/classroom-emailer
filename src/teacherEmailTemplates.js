const footer = `
--

Signup Sheet: https://docs.google.com/spreadsheets/d/1Sv5O-SB_oYS_hcJcK64MUPTUUcucEydIQqPLIb2hAI0/edit#gid=0
`;

const teacherEmailTemplates = [
  {
    // Friday laundry pick-up
    service: /^Friday/i,
    subject: "🧺 Ginkgo Laundry:",
    text: familyName =>
      (
        `
${
  /[Ff]amily$/.test(familyName) ? "The " : " "
}${familyName} is signed up to pick up laundry today.

Happy Friday!
    ` + footer
      ).trim()
  },
  {
    // Wednesday home-made snack
    service: /^Wednesday/i,
    subject: "🍌 Ginkgo Snack: ",
    text: familyName =>
      (
        `
${
  /[Ff]amily$/.test(familyName) ? "The " : " "
}${familyName} is signed up to bring today’s snack.
    ` + footer
      ).trim()
  },
  {
    // Monday drop off boquet of flowers and snacks
    service: /^Monday/i,
    subject: "🌷🍌 Ginkgo Flowers and Snack:",
    text: familyName =>
      (
        `
${
  /[Ff]amily/.test(familyName) ? "The " : " "
}${familyName} is signed up to bring in flowers and a snack today.
    ` + footer
      ).trim()
  }
];

export default teacherEmailTemplates;
