const core = require("@actions/core");
const fetchResults = require("./fetchresults");

async function run() {
  const results = await fetchResults();
  console.log(results);
  core.setOutput("results-output", results);
}

run();