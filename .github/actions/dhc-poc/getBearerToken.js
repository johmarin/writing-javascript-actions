const request = require("request-promise");
const core = require("@actions/core");

const options = {
  method: "POST",
  uri: "https://login.microsoftonline.com/"+core.getInput("tenant-id")+"/oauth2/token",
  headers: {
    Accept: "application/json",
    "grant_type": "client_credentials",
    "client_id": core.getInput("client-id"),
    "client_secret": core.getInput("client-secret"),
    "resource": "https://management.azure.com/"
  },
  json: true
};

async function getBearerToken() {
  const res = await request(options);
  return res.value;
}

module.exports = getBearerToken;