const request = require("request-promise");
const core = require("@actions/core");

const options = {
  method: "GET",
  uri: "https://management.azure.com/subscriptions/"+core.getInput("subscription-id")+"/providers/Microsoft.Insights/webtests?api-version=2015-05-01",
  headers: {
    Accept: "application/json",
    "x-api-key": core.getInput("api-key")
  },
  json: true
};

async function listWebtests() {
  const res = await request(options);
  return res.value;
}

module.exports = listWebtests;