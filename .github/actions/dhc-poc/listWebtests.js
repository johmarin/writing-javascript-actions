const request = require("request-promise");
const core = require("@actions/core");

async function listWebtests(token) {
  const options = {
    method: "GET",
    uri: "https://management.azure.com/subscriptions/"+core.getInput("subscription-id")+"/providers/Microsoft.Insights/webtests?api-version=2015-05-01",
    headers: {
      Accept: "application/json",
      "Authorization": "Bearer " + token
    },
    json: true
  };

  const res = await request(options);
  return res.value;
}

module.exports = listWebtests;