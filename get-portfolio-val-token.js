const args = require('yargs').argv;

// Function to get the portfolio value per token in USD
function getPortfolioValPerToken(usdValues) {
  return new Promise(function (resolve) {
    let output = [];
    let btcOutputArr = [];
    let ethOutputArr = [];
    let xrpOutputArr = [];

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

      let d = new Date(jsonFromLine.timestamp * 1000);
      let dateFromCSV = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
      if (jsonFromLine.token === 'ETH') {
        if (args.date === dateFromCSV) {
          ethOutputArr.push({ "token": jsonFromLine.token, "amount": jsonFromLine.amount * usdValues.ETH.USD })
        }
      } else if (jsonFromLine.token === 'BTC') {
        if (args.date === dateFromCSV) {
          btcOutputArr.push({ "token": jsonFromLine.token, "amount": jsonFromLine.amount * usdValues.ETH.USD })
        }
      }
      else if (jsonFromLine.token === 'XRP') {
        if (args.date === dateFromCSV) {
          xrpOutputArr.push({ "token": jsonFromLine.token, "amount": jsonFromLine.amount * usdValues.ETH.USD })
        }
      }
    });
    
    lineReader.on('close', function () {
      output.push(ethOutputArr);
      output.push(btcOutputArr);
      output.push(xrpOutputArr);
      resolve(output);
    });
  });
}

module.exports = { getPortfolioValPerToken };
