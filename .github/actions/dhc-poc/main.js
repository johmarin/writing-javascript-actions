const core = require("@actions/core");
const fetchResults = require("./fetchresults");
const getBearerToken = require("./getBearerToken");
const listWebtests = require("./listWebtests");

async function logStatus(webTests) {
  for (const [key, value] of webTests) {
    console.log("WebtestId: "+key+", Has Success: "+value.hasSuccessfulResult)
  }
}

async function run() {
  var monitoredWebtests = new Set();
  monitoredWebtests.add("Ping-Availability Test;Central US")
  const timeout = 10 * 60 * 1000
  const startTime = new Date().getTime()
  console.log("Start UTC Time: " + new Date().getTime())

  const token = await getBearerToken();

  
  const webTestsResult = await listWebtests(token);
  const resourceName = "dhc-aiwebtests-ai-dev";
  const webTestFilter = "Ping-Availability Test";
  var receivedTestResults = new Set();
  console.log("Processing Web Tests")
  console.log(webTestsResult);

  var webTests = new Map();
  webTestsResult.forEach(webTestResult => {
    console.log("Name: "+webTestResult.properties.Name)
    console.log("Id: "+webTestResult.properties.SyntheticMonitorId)

    const tags = webTestResult.tags;
    //console.log(tags);
    var validResource = false
    Object.keys(tags).forEach(tag => {
      if (tag.includes("/components/"+resourceName))
        validResource = true
    });

    if (!validResource)
      return

    //if (!webTestResult.properties.SyntheticMonitorId.endsWith(resourceName))
    //  return

    if (!webTestResult.properties.Name.startsWith(webTestFilter))
      return
    
    //console.log("Name: "+webTestResult.properties.name)
    console.log("Regions:")
    webTestResult.properties.Locations.forEach(region => {
      console.log("Region: "+region.Id)
      webTests.set(webTestResult.properties.Name+":"+region.Id, {hasSuccessfulResult: false})
    });
    

  });
  while (new Date().getTime() - startTime < timeout) {
    console.log("UTC Time: " + new Date().getTime())
    const results = await fetchResults();
    results.forEach(element => {
      nameLocation = element.availabilityResult.name + ";" + element.availabilityResult.location
      
      //Exclude non monitored tests or tests that completed before startTime
      if (receivedTestResults.has(element.id) || new Date(element.timestamp) < startTime)
        return

      receivedTestResults.add(element.id)

      console.log(element.availabilityResult.name)
      console.log(element.availabilityResult.location)
      console.log(element.timestamp);
      console.log("Success:" + element.availabilityResult.success)
    });
    logStatus(webTests)
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