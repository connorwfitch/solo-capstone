'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Lists', [
      {
        title: 'Inbox',
        color: '#467BB0',
        userId: 1
      },
      {
        title: 'Work',
        color: '#E44332',
        userId: 1
      },
      {
        title: 'Chores',
        color: '#2FB86F',
        userId: 1
      },
      {
        title: 'Social',
        color: '#EAC435',
        userId: 1
      },
      {
        title: 'Inbox',
        color: '#467BB0',
        userId: 2
      },
      {
        title: 'Inbox',
        color: '#467BB0',
        userId: 3
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lists', null, {});
  }
};
