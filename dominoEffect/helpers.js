const { state, market } = require('./state');

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

module.exports = {
  calculateRevenueAndUpdateState,
  calculateProfitAndUpdateState,
  calculatePriceAndUpdateState,
  calculateUnitSalesAndUpdateState
};
