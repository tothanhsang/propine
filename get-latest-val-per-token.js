getUSDValues = require("./get-value");

// Function to get the latest portfolio value per token in USD
function getLatestValPerTokenInUSD() {
  return new Promise(function (resolve) {
    let output = [];
    let btcOutputArr = { "token": "BTC", "amount": 0, "timestamp": 0 };
    let ethOutputArr = { "token": "ETH", "amount": 0, "timestamp": 0 };
    let xrpOutputArr = { "token": "XRP", "amount": 0, "timestamp": 0 };

    let lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('transactions.csv')
    });

    lineReader.on('line', function (line) {
      let jsonFromLine = {};
      let lineSplit = line.split(',');
      jsonFromLine.timestamp = lineSplit[0];
      jsonFromLine.transaction_type = lineSplit[1];
      jsonFromLine.token = lineSplit[2];
      jsonFromLine.amount = lineSplit[3];

      if (jsonFromLine.token === 'ETH' && jsonFromLine.timestamp > ethOutputArr.timestamp) {
        ethOutputArr.amount = jsonFromLine.amount;
        ethOutputArr.timestamp = jsonFromLine.timestamp;
      }

      else if (jsonFromLine.token === 'BTC' && jsonFromLine.timestamp > btcOutputArr.timestamp) {
        btcOutputArr.amount = jsonFromLine.amount;
        btcOutputArr.timestamp = jsonFromLine.timestamp

      }

      else if (jsonFromLine.token === 'XRP' && jsonFromLine.timestamp > xrpOutputArr.timestamp) {
        xrpOutputArr.amount = jsonFromLine.amount;
        xrpOutputArr.timestamp = jsonFromLine.timestamp;
      }
    });

    lineReader.on('close', function () {
      getUSDValues.getUSDValues().then(function (result) {
        usdValues = result;
        ethOutputArr.amount = ethOutputArr.amount * usdValues.ETH.USD;
        btcOutputArr.amount = btcOutputArr.amount * usdValues.ETH.USD;
        xrpOutputArr.amount = xrpOutputArr.amount * usdValues.ETH.USD;
        output.push(ethOutputArr);
        output.push(btcOutputArr);
        output.push(xrpOutputArr);
        resolve(output);
      }, function (err) {
        console.log(err);
      })
    });
  });
}

module.exports = { getLatestValPerTokenInUSD };
