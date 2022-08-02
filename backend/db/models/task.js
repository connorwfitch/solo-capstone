'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    details: DataTypes.TEXT,
    dueAt: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
    listId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'userId' });
    Task.belongsTo(models.List, { foreignKey: 'listId' });
  };
  return Task;
};