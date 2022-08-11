'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [
      // Board 1
      {
        title: 'Synergize team infrastructure',
        details: 'VERY IMPORTANT',
        sectionId: 1
      },
      {
        title: 'Onboard new multi-channel paradigm',
        sectionId: 1
      },
      {
        title: 'Streamline operations',
        sectionId: 1
      },
      {
        title: 'Invent more jargon',
        details: 'Must complete by EOD Friday',
        sectionId: 1
      },
      // Board 2
      {
        title: 'Secure funding for West Dakota',
        sectionId: 4
      },
      {
        title: 'Create West Dakota',
        sectionId: 4
      },
      {
        title: 'Profit',
        details: '$$$$$$$',
        sectionId: 4
      },
      {
        title: 'Hello there',
        details: 'GENERAL KENOBI',
        sectionId: 6
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
