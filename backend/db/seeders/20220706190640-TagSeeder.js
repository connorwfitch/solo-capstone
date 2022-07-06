'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      {
        title: 'Urgent',
        color: '#E44332',
        userId: 1
      },
      {
        title: 'Weekend',
        color: '#7B52A9',
        userId: 1
      },
      {
        title: 'Urgent',
        color: '#E44332',
        userId: 2
      },
      {
        title: 'Urgent',
        color: '#E44332',
        userId: 3
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
