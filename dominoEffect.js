const { observe, addReactionOnStateChange } = require('./observe');

// DOMINO EFFECT

// clear console
process.stdout.write('\033c');

// state (best guess)
const state = {
  tax: 1.06,
  materials: 10000,
  processing: 20000,
  logistics: 5000,
  marketing: 15000,
  price: 25,
  unitSales: 10000,
  // initialized below
  revenue: null,
  profit: null
};
// tiered target market
const market = {
  total: 100000,
  top: {
    percent: 0.01 // percent that will always buy regardless of price
  },
  middleHigh: {
    percent: 0.09, // percent that will buy only in this price range
    priceMax: 29.99,
    priceLow: 20
  },
  middleLow: {
    percent: 0.5, // percent that will buy only in this price range
    priceMax: 19.99,
    priceLow: 12.5
  },
  bottom: {
    percent: 0.4, // percent that will buy only in this price range
    priceMax: 12.49,
    priceLow: 0
  }
};
// observe state to react to changes
observe(state);

// HELPER FUNCTIONS

const round = num => Math.round(num * 100) / 100;

const calculateRevenueAndUpdateState = () => {
  state.revenue = round(state.price * state.unitSales);
};

const calculateProfitAndUpdateState = () => {
  const { tax, materials, processing, logistics, marketing, revenue } = state;
  const expenses = (materials + processing + logistics + marketing) * tax;

  state.profit = revenue - expenses;
};

const calculatePriceAndUpdateState = () => {
  // price = 1/2000 of expenses
  state.price =
    (state.materials + state.processing + state.logistics + state.marketing) *
    0.0005;
};

const calculateUnitSalesAndUpdateState = () => {
  const top = market.total * market.top.percent;
  const middleHigh =
    state.price < 30 && state.price >= 20
      ? market.total * market.middleHigh.percent
      : 0;
  const middleLow =
    state.price < 20 && state.price >= 12.5
      ? market.total * market.middleLow.percent
      : 0;
  const bottom =
    state.price < 12.5 && state.price >= 0
      ? market.total * market.bottom.percent
      : 0;

  state.unitSales = top + middleHigh + middleLow + bottom;
};

// REACTIONS

// if taxes change, recalculate revenue
addReactionOnStateChange({
  reaction: calculateRevenueAndUpdateState,
  state,
  property: 'tax'
});
// if revenue changes, recalculate profit
addReactionOnStateChange({
  reaction: calculateProfitAndUpdateState,
  state,
  property: 'revenue'
});
// if materials change, recalculate price
addReactionOnStateChange({
  reaction: calculatePriceAndUpdateState,
  state,
  property: 'materials'
});
// if price changes, recalculate unitSales
addReactionOnStateChange({
  reaction: calculateUnitSalesAndUpdateState,
  state,
  property: 'price'
});
// if price changes (but unitSales are not affected), recalculate revenue
addReactionOnStateChange({
  reaction: calculateRevenueAndUpdateState,
  state,
  property: 'price'
});
// if unitSales change, recalculate revenue
addReactionOnStateChange({
  reaction: calculateRevenueAndUpdateState,
  state,
  property: 'unitSales'
});
// if processing changes, recalculate price
addReactionOnStateChange({
  reaction: calculatePriceAndUpdateState,
  state,
  property: 'processing'
});
// if logistics change, recalculate price
addReactionOnStateChange({
  reaction: calculatePriceAndUpdateState,
  state,
  property: 'logistics'
});
// if marketing changes, recalculate price
addReactionOnStateChange({
  reaction: calculatePriceAndUpdateState,
  state,
  property: 'marketing'
});

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
