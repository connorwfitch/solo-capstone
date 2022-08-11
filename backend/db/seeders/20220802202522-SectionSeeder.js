'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [
      // Board 1
      {
        title: 'Upcoming',
        orderIds: '1,2,3,4',
        boardId: 1
      },
      {
        title: 'In Progress',
        orderIds: '',
        boardId: 1
      },
      {
        title: 'Completed',
        orderIds: '',
        boardId: 1
      },

      // Board 2
      {
        title: 'Upcoming',
        orderIds: '5,6,7',
        boardId: 2
      },
      {
        title: 'In Progress',
        orderIds: '',
        boardId: 2
      },
      {
        title: 'Completed',
        orderIds: '8',
        boardId: 2
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};
