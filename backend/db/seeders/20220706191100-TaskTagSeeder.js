'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TaskTags', [
      {
        taskId: 1,
        tagId: 2
      },
      {
        taskId: 2,
        tagId: 1
      },
      {
        taskId: 5,
        tagId: 1
      },
      {
        taskId: 6,
        tagId: 2
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TaskTags', null, {});
  }
};
