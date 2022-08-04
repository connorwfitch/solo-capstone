'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    title: DataTypes.STRING,
    orderIds: DataTypes.TEXT,
    boardId: DataTypes.INTEGER
  }, {});
  Section.associate = function(models) {
    Section.belongsTo(models.Board, { foreignKey: 'boardId' });
    Section.hasMany(models.Item, { foreignKey: 'sectionId', onDelete: 'CASCADE', hooks: true });
  };
  return Section;
};