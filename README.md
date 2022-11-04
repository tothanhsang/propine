### Prerequisite: Node.js environment

### Download [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip) then decompression and copy in folder /propine

### Install lib
* `npm i`

### Given no parameters, return the latest portfolio value per token in USD
* `node main.js`

### Given a token, return the latest portfolio value for that token in USD
* `node main.js --token=BTC`

### Given a date, return the portfolio value per token in USD on that date
* `node main.js --date=3/11/2022`

### Given a date and a token, return the portfolio value of that token in USD on that date
* `node main.js --date=3/11/2022 --token=BTC`
