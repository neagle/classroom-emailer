const getNotifications = require("./getNotifications");

it("send notifications for Friday laundry pick-up two days before", () => {
  // process.env.date = new Date("9/4/2019");
  process.env.date = new Date("2019-09-04T09:09:16.230Z");

  const services = [
    {
      service: "Friday Laundry Pick Up",
      dates: [
        ["9/5", "Adams family"],
        ["9/6", "Eagle family"],
        ["9/7", "Some other family"]
      ]
    }
  ];

  const notifications = getNotifications(services);

  expect(notifications.length).toBe(1);
  expect(notifications[0].family).toBe("Eagle family");
});

it("send notifications for Wednesday snack two days before", () => {
  process.env.date = new Date("9/2/2019");
  const services = [
    {
      service: "Wednesday Home-made Snack",
      dates: [["9/4", "Eagle family"], ["9/5", "Some other family"]]
    }
  ];

  const notifications = getNotifications(services);

  expect(notifications.length).toBe(1);
  expect(notifications[0].family).toBe("Eagle family");
});
it("should send notifications for Monday flowers + snack on the Friday before", () => {
  const services = [
    {
      service: "Monday Drop Off Bouquet of Flowers and snacks",
      dates: [["9/4", "Eagle family"], ["9/5", "Some other family"]]
    }
  ];

  process.env.date = new Date("9/1/2019");
  const notifications = getNotifications(services);

  expect(notifications.length).toBe(1);
  expect(notifications[0].family).toBe("Eagle family");
});

it("should send a notification to the room parents if no one is signed up", () => {
  const services = [
    {
      service: "Monday Drop Off Bouquet of Flowers and snacks",
      dates: [["9/6", null], ["9/6", "Some family"]]
    }
  ];

  process.env.date = new Date("9/1/2019");
  const notifications = getNotifications(services);

  // console.log(notifications);

  expect(notifications.length).toBe(1);
  expect(notifications[0].family).toBeNull();
});
