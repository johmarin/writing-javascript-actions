const core = require("@actions/core");
const fetchResults = require("./fetchresults");
const listWebtests = require("./listWebtests");

async function run() {
  //const webTests = await listWebtests();
  //console.log(webTests);
  var monitoredWebtests = new Set();
  monitoredWebtests.add("Synthetic AIWebTests: ReleaseCompleted;West US 2")
  const timeout = 20 * 1000
  const startTime = new Date().getTime()
  console.log("Start UTC Time: " + new Date().getTime())
  while (new Date().getTime() - startTime < timeout) {
    console.log("UTC Time: " + new Date().getTime())
    const results = await fetchResults();
    results.forEach(element => {
      nameLocation = element.availabilityResult.name + ";" + element.availabilityResult.location
      if (!monitoredWebtests.has(nameLocation))
        break
      console.log(element.availabilityResult.name)
      console.log(element.availabilityResult.location)
      console.log(element.timestamp);
      console.log(element.availabilityResult.success)
    });
    console.log("Raw JSON:");
    //console.log(results)
    console.log("Waiting 2s to requery");
    await sleep(5000);
  }
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

run();