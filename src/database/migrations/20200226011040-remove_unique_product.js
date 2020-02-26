module.exports = {
  up: queryInterface => {
    return queryInterface.removeConstraint('orders', 'orders_product_key');
  },
};
