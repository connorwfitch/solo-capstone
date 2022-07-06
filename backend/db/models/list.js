'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: DataTypes.STRING,
    icon: DataTypes.STRING,
    color: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.User, { foreignKey: 'userId' });
    List.hasMany(models.Task, { foreignKey: 'listId', onDelete: 'CASCADE', hooks: true });
  };
  return List;
};