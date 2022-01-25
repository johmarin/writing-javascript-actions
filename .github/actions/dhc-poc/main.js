const core = require("@actions/core");
const fetchResults = require("./fetchresults");
const listWebtests = require("./listWebtests");

async function run() {
  const webTests = await listWebtests();
  console.log(webTests);
  console.log("UTC Time: "+new Date().getTime())
  const results = await fetchResults();
  results.forEach(element => {
    console.log(element.availabilityResult.name)
    console.log(element.availabilityResult.location)
    console.log(element.timestamp);
    console.log(element.availabilityResult.success)
  });
  console.log("Raw JSON:");
  console.log(results)
}

run();