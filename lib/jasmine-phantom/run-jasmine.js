var system = require('system');

function waitFor(message, testFx, onReady, timeOutMillis) {
  var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001; //< Default Max Timeout is 3s
  var start = new Date().getTime();
  var condition = false;
  var interval = setInterval(function() {
    if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
      // If not time-out yet and condition not yet fulfilled
      condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
    } else {
      if(!condition) {
        // If condition still not fulfilled (timeout but condition is 'false')
        console.log("'Timed out waiting for " + message);
        phantom.exit(1);
      } else {
        // Condition fulfilled (timeout and/or condition is 'true')
        typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
        clearInterval(interval); //< Stop this interval
      }
    }
  }, 100); //< repeat check every 100ms
};


if (system.args.length !== 2) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit();
}

function jasmineReportsFinished(page){
  return page.evaluate(function(){
    return jsApiReporter.finished;
  });
}

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
      if (suites[i].id == specId) {
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

var page = require('webpage').create();

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.open(system.args[1], function(status){
  if (status !== "success") {
    console.log("Unable to access network");
    phantom.exit();
  } else {
    waitFor(
      "Jasmine specs to report finished",
      function() { return jasmineReportsFinished(page); },
      function(){
        var summary = page.evaluate(collectJasmineResults);
        sumUpAndExit(summary);
      },
      30000
    );
  }
});
