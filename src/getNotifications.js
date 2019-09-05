const { differenceInDays, startOfDay } = require("date-fns");
const { convertToTimeZone } = require("date-fns-timezone");

module.exports = services => {
  const notifications = [];

  const today = convertToTimeZone(process.env.date || new Date(), {
    timeZone: "America/New_York"
  });

  console.log("today", today);

  process.env.debug && console.log("TODAY", today);

  services.forEach(({ service, dates }) => {
    dates.forEach(([monthAndDay, family]) => {
      const [serviceMonth, serviceDay] = monthAndDay.split("/");
      const serviceYear =
        today.getMonth() < serviceMonth
          ? today.getFullYear()
          : today.getFullYear() + 1;

      const serviceDate = new Date(
        `${serviceMonth}/${serviceDay}/${serviceYear}`
      );
      console.log("serviceDate", serviceDate);

      const daysLeft = differenceInDays(serviceDate, startOfDay(today));

      if (startOfDay(serviceDate) >= today) {
        if (
          (/friday/i.test(service) && daysLeft === 2) ||
          (/wednesday/i.test(service) && daysLeft === 2) ||
          (/monday/i.test(service) && daysLeft === 3) ||
          (daysLeft === 5 && !family)
        ) {
          notifications.push({
            serviceDate,
            service,
            family
          });
        }
      }
    });
  });

  process.env.debug && console.log("NOTIFICATIONS", notifications);
  return notifications;
};
