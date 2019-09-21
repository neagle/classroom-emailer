import "dotenv/config";

import rp from "request-promise-native";
import getServices from "./getServices";
import getNotifications from "./getNotifications";
import sendNotifications from "./sendNotifications";

const handler = async function(event, context) {
  console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2));
  console.log("EVENT\n" + JSON.stringify(event, null, 2));

  // Env variables will become strings even if we set them as booleans
  process.env.debug = event.debug === false ? "false" : "true";

  if (event.date) {
    process.env.date = event.date;
  }

  if (event.sendToRealPeople === true) {
    // Really send emails to real recipients!
    process.env.sendToRealPeople = true;
  }

  const URL = `https://spreadsheets.google.com/feeds/download/spreadsheets/Export\?key\=${process.env.SPREADSHEET_KEY}\&exportFormat\=tsv`;

  await rp(URL)
    .then(getServices)
    .then(services => getNotifications(services, event.recipients))
    .then(sendNotifications)
    .catch(err => console.log("ERROR", err));

  return context.logStreamName;
};

export { handler };
