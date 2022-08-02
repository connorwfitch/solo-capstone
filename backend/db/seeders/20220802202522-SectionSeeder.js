'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [
      // Board 1
      {
        title: 'Upcoming',
        index: 1,
        boardId: 1
      },
      {
        title: 'In Progress',
        index: 2,
        boardId: 1
      },
      {
        title: 'Complete',
        index: 3,
        boardId: 1
      },

      // Board 2
      {
        title: 'Upcoming',
        index: 1,
        boardId: 2
      },
      {
        title: 'In Progress',
        index: 2,
        boardId: 2
      },
      {
        title: 'Complete',
        index: 3,
        boardId: 2
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};
