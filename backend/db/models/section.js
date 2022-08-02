'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    title: DataTypes.STRING,
    index: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER
  }, {});
  Section.associate = function(models) {
    Section.belongsTo(models.Board, { foreignKey: 'boardId' });
    Section.hasMany(models.Item, { foreignKey: 'sectionId', onDelete: 'CASCADE', hooks: true });
  };
  return Section;
};