const args = require('yargs').argv;

const getLatestValPerTokenInUSD = require("./get-latest-val-per-token").getLatestValPerTokenInUSD;
const getPortfolioValPerToken = require("./get-portfolio-val-token").getPortfolioValPerToken;
const filterByProperty = require("./filter-by-property").filterByProperty;
const getUSDValues = require("./get-value").getUSDValues;

if (args.token === undefined && args.date === undefined) {
  console.log("Given no parameters, return the latest portfolio value per token in USD");
  getLatestValPerTokenInUSD().then(function (result) { console.log(result); });
}

else if (args.token != undefined && args.date === undefined) {
  console.log("Given a token, return the latest portfolio value for that token in USD");
  getLatestValPerTokenInUSD().then(function (result) {
    let resultPerToken = result.filter(function (record) {
      return record.token === args.token;
    })
    console.log(resultPerToken);
  });
}

else if (args.date != undefined && args.token === undefined) {
  console.log("Given a date, return the portfolio value per token in USD on that date");
  getUSDValues().then(function (result) {
    getPortfolioValPerToken(result).then(function (result) { console.log(result); });
  }, function (err) {
    console.log(err);
  })
}

else if (args.token != undefined && args.date != undefined) {
  console.log("Given a date and a token, return the portfolio value of that token in USD on that date");
  getUSDValues().then(function (usdVal) {
    getPortfolioValPerToken(usdVal).then(function (result) {
      let resultPerToken = filterByProperty(result, "token", args.token);
      console.log(resultPerToken);
    });
  }, function (err) {
    console.log(err);
  })
}
