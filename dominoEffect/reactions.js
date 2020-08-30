const { addReactionOnStateChange } = require('../observe');
const { state } = require('./state');
const {
  calculateRevenueAndUpdateState,
  calculateProfitAndUpdateState,
  calculatePriceAndUpdateState,
  calculateUnitSalesAndUpdateState
} = require('./helpers');

// REACTIONS
module.exports = () => {
  // if taxes change, recalculate profit
  addReactionOnStateChange({
    reaction: calculateProfitAndUpdateState,
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
};
