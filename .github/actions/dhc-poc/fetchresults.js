const request = require("request-promise");

const options = {
  method: "GET",
  uri: "https://api.applicationinsights.io/v1/apps/724db0d6-7ec8-49b0-a359-456d972bde00/events/availabilityResults",
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