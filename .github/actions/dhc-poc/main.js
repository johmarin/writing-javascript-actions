const core = require("@actions/core");
const fetchResults = require("./fetchresults");

async function run() {
  console.log("UTC Time: "+new Date().getTime())
  const results = await fetchResults();
  console.log(results);
}

run();