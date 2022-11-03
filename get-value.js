const request = require("request");

// Function to fetch the USD Values from CryptoCompare
function getUSDValues() {
  const params = {
    url: 'https://min-api.cryptocompare.com/data/pricemulti',
    fsyms: 'BTC,ETH,XRP',
    tsyms: 'USD',
    api_key: 'bea66d2297af44dec394597b938dfa3f08c3f3b72b232da36e9366bebb9d79e6'
  }
  let cryptoURL = `${params.url}?fsyms=${params.fsyms}&tsyms=${params.tsyms}&api_key=${params.api_key}`;
  let options = {
    url: cryptoURL,
    headers: {
      'User-Agent': 'request'
    }
  };
  return new Promise(function (resolve, reject) {
    request.get(options, function (err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    })
  });
}

module.exports = { getUSDValues };
