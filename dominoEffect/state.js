const { observe } = require('../observe');

// state (best guess)
const state = {
  tax: 1.06,
  materials: 10000,
  processing: 20000,
  logistics: 5000,
  marketing: 15000,
  price: 25, // 1/2000 of total expenses
  unitSales: 10000,
  // initialized in index.js
  revenue: null,
  profit: null
};

// tiered target market based on market research
const market = {
  total: 100000,
  top: {
    percent: 0.01 // percent of total that will always buy regardless of price
  },
  middleHigh: {
    percent: 0.09, // percent of total that will buy only in this price range
    priceMax: 29.99,
    priceLow: 20
  },
  middleLow: {
    percent: 0.5, // percent of total that will buy only in this price range
    priceMax: 19.99,
    priceLow: 12.5
  },
  bottom: {
    percent: 0.4, // percent of total that will buy only in this price range
    priceMax: 12.49,
    priceLow: 0
  }
};
// observe state to react to changes
observe(state);

module.exports = { state, market };
