const request = require("request-promise");

const options = {
  method: "GET",
  uri: "https://api.applicationinsights.io/v1/apps/"+core.getInput("application-id")+"/events/availabilityResults",
  headers: {
    Accept: "application/json",
    "x-api-key": core.getInput("api-key")
  },
  json: true
};

async function fetchResults() {
  const res = await request(options);
  return res.value;
}

module.exports = fetchResults;