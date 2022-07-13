'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        title: 'Walk the dog',
        details: 'She is a good puppy',
        listId: 1,
        userId: 1
      },
      {
        title: 'Refill prescription',
        details: 'Pharmacy on the corner of South Ave',
        listId: 1,
        userId: 1
      },
      {
        title: 'Do the dishes',
        listId: 3,
        userId: 1
      },
      {
        title: 'Create a Todoist clone',
        dueAt: new Date('2022-07-18'),
        listId: 2,
        userId: 1
      },
      {
        title: 'Schedule a meeting with Bill Gates',
        details: 'Pitch my billion dollar business idea: make a new state called West Dakota',
        dueAt: new Date('2022-08-03'),
        listId: 2,
        userId: 1
      },
      {
        title: 'Get a birthday present for Alex',
        details: 'Maybe something for his pottery?',
        dueAt: new Date('2022-09-17'),
        listId: 4,
        userId: 1
      },
      {
        title: 'Help Mitch move apartments',
        dueAt: new Date('2022-08-08'),
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
