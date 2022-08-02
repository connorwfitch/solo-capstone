'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [
      // Board 1
      {
        title: 'Synergize team infrastructure',
        index: 1,
        sectionId: 1
      },
      {
        title: 'Onboard new multi-channel paradigm',
        index: 2,
        sectionId: 1
      },
      {
        title: 'Streamline operations',
        index: 3,
        sectionId: 1
      },

      // Board 2
      {
        title: 'Secure funding for West Dakota',
        index: 1,
        sectionId: 4
      },
      {
        title: 'Create West Dakota',
        index: 2,
        sectionId: 4
      },
      {
        title: 'Profit $$$',
        index: 3,
        sectionId: 4
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
