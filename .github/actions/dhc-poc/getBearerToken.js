const request = require("request-promise");
const core = require("@actions/core");

const data = {
  "grant_type": "client_credentials",
  "client_id": core.getInput("client-id"),
  "client_secret": core.getInput("client-secret"),
  "resource": "https://management.azure.com/"
};

const options = {
  method: "POST",
  uri: "https://login.microsoftonline.com/"+core.getInput("tenant-id")+"/oauth2/token",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
};

async function getBearerToken() {
  const res = await request(options);
  return res.value;
}

module.exports = getBearerToken;