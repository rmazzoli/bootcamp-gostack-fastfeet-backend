module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'recipients',
          'canceled_at',
          {
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('recipients', 'canceled_at', {
          transaction: t,
        }),
      ]);
    });
  },
};
