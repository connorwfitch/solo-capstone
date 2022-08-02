'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    color: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Board.associate = function(models) {
    Board.belongsTo(models.User, { foreignKey: 'userId' });
    Board.hasMany(models.Section, { foreignKey: 'boardId', onDelete: 'CASCADE', hooks: true });
  };
  return Board;
};