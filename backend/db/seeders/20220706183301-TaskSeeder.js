'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        title: 'Walk the dog',
        listId: 1,
        userId: 1
      },
      {
        title: 'Refill prescription',
        listId: 1,
        userId: 1
      },
      {
        title: 'Do the dishes',
        listId: 3,
        userId: 1
      },
      {
        title: 'Complete error handling',
        listId: 2,
        userId: 1
      },
      {
        title: 'Schedule a meeting with Tony Stark',
        listId: 2,
        userId: 1
      },
      {
        title: 'Get a birthday present for Alex',
        listId: 4,
        userId: 1
      },
      {
        title: 'Mow the lawn',
        listId: 5,
        userId: 2
      },
      {
        title: 'Buy groceries',
        listId: 6,
        userId: 3
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
