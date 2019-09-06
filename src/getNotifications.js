const { differenceInDays, startOfDay } = require("date-fns");
const { convertToTimeZone } = require("date-fns-timezone");

module.exports = services => {
  const notifications = [];

  const today = process.env.date ? new Date(process.env.date) : new Date();

  process.env.debug && console.log("TODAY", today);

  services.forEach(({ service, dates }) => {
    dates.forEach(([monthAndDay, family]) => {
      const [serviceMonth, serviceDay] = monthAndDay.split("/").map(Number);

      // Get the non-zero-indexed month... why would anyone ever zero index the months?
      const currentMonth = today.getMonth() + 1;
      const currentDay = today.getDate();

      const serviceYear =
        currentMonth < serviceMonth ||
        (currentMonth === serviceMonth && currentDay <= serviceDay)
          ? today.getFullYear()
          : today.getFullYear() + 1;

      const serviceDate = new Date(today);
      serviceDate.setYear(serviceYear);
      // Month wants to be zero indexed. God knows why.
      serviceDate.setMonth(serviceMonth - 1);
      serviceDate.setDate(serviceDay);

      const daysLeft = differenceInDays(serviceDate, today);

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
