'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [
      // Board 1
      {
        title: 'Upcoming',
        orderIds: ',1,2,3',
        boardId: 1
      },
      {
        title: 'In Progress',
        orderIds: '',
        boardId: 1
      },
      {
        title: 'Complete',
        orderIds: '',
        boardId: 1
      },

      // Board 2
      {
        title: 'Upcoming',
        orderIds: ',4,5,6',
        boardId: 2
      },
      {
        title: 'In Progress',
        orderIds: '',
        boardId: 2
      },
      {
        title: 'Complete',
        orderIds: '',
        boardId: 2
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};
