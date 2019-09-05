require("dotenv").config();

const util = require("util");
const sendNotifications = require("./sendNotifications");

const sendEmail = require("./sendEmail");
jest.mock("./sendEmail");

afterEach(() => {
  jest.clearAllMocks();
});

it("should send a notification", () => {
  // const sendEmail = jest.fn();
  const notifications = [
    {
      serviceDate: new Date("2019-09-06T04:00:00.000Z"),
      service: "Monday Drop Off Bouquet of Flowers and snacks",
      family: "Eagle family"
    }
  ];

  sendNotifications(notifications);

  expect(sendEmail).toBeCalledTimes(1);
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
