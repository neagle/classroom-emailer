import "dotenv/config";

import sendNotifications from "./sendNotifications";
import emailTemplates from "./familyEmailTemplates";

const sendEmail = require("./sendEmail");
jest.mock("./sendEmail");

const mockedFamilyEmails = require("./__mocks__/familyEmails");
jest.mock("./familyEmails", () => require("./__mocks__/familyEmails"), {
  virtual: true
});

afterEach(() => {
  jest.clearAllMocks();
});

it("should send a notification", () => {
  // const sendEmail = jest.fn();
  const family = mockedFamilyEmails[1];
  const service = emailTemplates[2];

  const serviceDate = new Date("2019-09-06T04:00:00.000Z");

  const notifications = [
    {
      serviceDate: serviceDate,
      service: "Monday Drop Off Bouquet of Flowers and snacks",
      family: `${family.name} family`
    }
  ];

  sendNotifications(notifications);

  expect(sendEmail).toBeCalledTimes(1);
  expect(sendEmail).toHaveBeenCalledWith(
    family.emails.join(", "),
    `${family.name} family ` + service.subject,
    service.text(serviceDate)
  );
});

it("should send multiple notifications", () => {
  // const sendEmail = jest.fn();
  const notifications = [
    {
      serviceDate: new Date("2019-09-06T04:00:00.000Z"),
      service: "Monday Drop Off Bouquet of Flowers and snacks",
      family: "Eagle family"
    },
    {
      serviceDate: new Date("2019-09-06T04:00:00.000Z"),
      service: "Monday Drop Off Bouquet of Flowers and snacks",
      family: "Eagle family"
    },
    {
      serviceDate: new Date("2019-09-06T04:00:00.000Z"),
      service: "Monday Drop Off Bouquet of Flowers and snacks",
      family: "Eagle family"
    }
  ];

  sendNotifications(notifications);

  expect(sendEmail).toBeCalledTimes(3);
});

it("should send a message to class parents saying that no one has signed up", () => {
  const notifications = [
    {
      serviceDate: new Date("2019-09-06T04:00:00.000Z"),
      service: "Monday Drop Off Bouquet of Flowers and snacks",
      family: null
    }
  ];

  sendNotifications(notifications);
  expect(sendEmail).toHaveBeenCalledTimes(1);
});
