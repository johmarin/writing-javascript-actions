const core = require("@actions/core");
const fetchResults = require("./fetchresults");

async function run() {
  console.log("UTC Time: "+new Date().getTime())
  const results = await fetchResults();
  results.forEach(element => {
    console.log(element.availabilityResult.name)
    console.log(element.timestamp);
    console.log(element.availabilityResult.success)
  });
  console.log("Raw JSON\n"+results);
}

run();