'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Boards', [
      {
        title: 'Sample Project',
        color: '#467BB0',
        userId: 1
      },
      {
        title: 'Top Secret',
        color: '#E44332',
        userId: 1
      },
      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Boards', null, {});
  }
};
