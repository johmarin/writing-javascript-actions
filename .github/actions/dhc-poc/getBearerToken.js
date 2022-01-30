const request = require("request-promise");
const core = require("@actions/core");

const data = {
  "grant_type": "client_credentials",
  "client_id": core.getInput("client-id"),
  "client_secret": core.getInput("client-secret"),
  "resource": "https://management.azure.com/"
};

var formBody = [];
for (var property in data) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const options = {
  method: "POST",
  uri: "https://login.microsoftonline.com/"+core.getInput("tenant-id")+"/oauth2/token",
  headers: {
    "Content-Type": "x-www-form-urlencoded"
  },
  body: formBody
};

async function getBearerToken() {
  const res = await request(options);
  return res.value;
}

module.exports = getBearerToken;