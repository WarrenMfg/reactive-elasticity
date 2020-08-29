const { calculateRevenueAndUpdateState } = require('./helpers');
const { state } = require('./state');
require('./reactions')();

// clear console
process.stdout.write('\033c');

// MICROECONOMICS PLAYGROUND TO DETERMINE ELASTICITY OF TARGET MARKET

// init to determine best guess for projected revenue and profit
calculateRevenueAndUpdateState();
console.log(Object.keys(state).forEach(key => console.log(key, state[key])));

// if processing can be reduced by $5,000 from $20,000 to $15,000
state.processing = 15000;
// and if marketing can be reduced by $5,000 from $15,000 to $10,000
state.marketing = 10000;
// then these changes will yield a $20 price
console.log(Object.keys(state).forEach(key => console.log(key, state[key])));

// but if we lower the price to $19.99, then we can reach the middleLow market and increase unitSales, and thus increase profit
state.price = 19.99;
console.log(Object.keys(state).forEach(key => console.log(key, state[key])));

/*

RESULT:
Reduce expenses by a total of $10,000 and lower the price to the maximum that the middleLow target market tier is willing to buy
and profit will increase from $197,000 to $977,090 -- a difference of $780,090 which is nearly a 500% increase.

*/
