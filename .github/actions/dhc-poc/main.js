const core = require("@actions/core");
const fetchResults = require("./fetchresults");
const getBearerToken = require("./getBearerToken");
const listWebtests = require("./listWebtests");

async function run() {
  //const webTests = await listWebtests();
  //console.log(webTests);
  var monitoredWebtests = new Set();
  monitoredWebtests.add("Ping-Availability Test;Central US")
  const timeout = 20 * 60 * 1000
  const startTime = new Date().getTime()
  console.log("Start UTC Time: " + new Date().getTime())
  const token = getBearerToken();
  const webTests = listWebtests(token);
  console.log(webTests);
  while (new Date().getTime() - startTime < timeout) {
    console.log("UTC Time: " + new Date().getTime())
    const results = await fetchResults();
    results.forEach(element => {
      nameLocation = element.availabilityResult.name + ";" + element.availabilityResult.location
      
      //Exclude non monitored tests or tests that completed before startTime
      if (!monitoredWebtests.has(nameLocation) || new Date(element.timestamp) < startTime)
        return
      console.log(element.availabilityResult.name)
      console.log(element.availabilityResult.location)
      console.log(element.timestamp);
      console.log(element.availabilityResult.success)
    });
    //console.log("Raw JSON:");
    //console.log(results)
    console.log("Waiting 20s to requery");
    await sleep(20*1000);
  }
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

run();