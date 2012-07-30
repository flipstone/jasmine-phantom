function collectJasmineResults() {
  console.log('');
  var suites = jsApiReporter.suites();
  var results = jsApiReporter.results();

  for(var specId in results) {
    var result = results[specId];
    if (result.result != "passed") {

      var name = findSpecName(specId, suites);

      console.log(name);

      for (var msgId in result.messages) {
        console.log('  ' + result.messages[msgId]);
      }

      console.log('');
    }
  }

  return summarizeResults(suites, results);

  function findSpecName(specId, suites) {
    for (var i in suites) {
      if (suites[i].id == specId && suites[i].type === "spec") {
        return suites[i].name;
      }

      var name = findSpecName(specId, suites[i].children);

      if (name) { return suites[i].name + ' ' + name };
    }
  }

  function summarizeResults(suites, results) {
    var total = { total: 0, passed: 0, failed: 0 }

    for (var i in suites) {
      var suite = suites[i];

      if (suite.type == 'spec') {
        total.total++;

        if (results[suite.id].result == 'passed') {
          total.passed++;
        } else {
          total.failed++;
        }
      }

      var subTotal = summarizeResults(suite.children, results);
      total.total += subTotal.total;
      total.passed += subTotal.passed;
      total.failed += subTotal.failed;
    }

    return total;
  }
}

function sumUpAndExit(summary) {
  console.log(summary.total + ' specs | ' + summary.failed + ' failing');

  if (summary.passed == summary.total) {
    phantom.exit();
  } else {
    phantom.exit(1);
  }
}

var page = require('webpage').create()
page.onConsoleMessage = function(msg) {
  console.log(msg);
};

var system = require('system');

function jasmineReportsFinished(page){
  return page.evaluate(function(){
    return jsApiReporter.finished;
  });
}

function waitForSpecsToFinish(page, seconds, whenDone) {
  if (jasmineReportsFinished(page)) {
    whenDone();
  } else {
    if (seconds > 0) {
      setTimeout(
        function() {waitForSpecsToFinish(page, seconds - 1, whenDone)},
        1000
      );
    } else {
      console.log("Jasmine tests didn't finish in 30 seconds... bailing out");
      phantom.exit(2);
    }
  }
}

page.open(system.args[1], function(status) {
  if (status == 'success') {
    waitForSpecsToFinish(page, 30, function() {
      var summary = page.evaluate(collectJasmineResults);
      sumUpAndExit(summary);
    });
  } else {
    console.log('Unable to connect to Jasmine server at ' + system.args[1]);
    phantom.exit(3);
  }
});

