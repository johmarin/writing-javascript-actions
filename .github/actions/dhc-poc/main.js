const core = require("@actions/core");
const fetchResults = require("./fetchresults");
const listWebtests = require("./listWebtests");

async function run() {
  //const webTests = await listWebtests();
  //console.log(webTests);
  const startTime = new Date().getTime()
  console.log("Start UTC Time: " + new Date().getTime())
  while (new Date().getTime() - startTime < 100000) {
    console.log("UTC Time: " + new Date().getTime())
    const results = await fetchResults();
    results.forEach(element => {
      console.log(element.availabilityResult.name)
      console.log(element.availabilityResult.location)
      console.log(element.timestamp);
      console.log(element.availabilityResult.success)
    });
    console.log("Raw JSON:");
    //console.log(results)
    console.log("Waiting 2s to requery")
    await (sleep(2000))
  }
}

run();