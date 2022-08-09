'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Boards', [
      {
        title: 'Sample Project',
        color: '#467BB0',
        orderIds: '1,2,3',
        userId: 1
      },
      {
        title: 'Top Secret',
        color: '#E44332',
        orderIds: '4,5,6',
        userId: 1
      },
      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Boards', null, {});
  }
};
