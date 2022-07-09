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
    Task.belongsToMany(models.Tag, {
      through: 'TaskTag',
      foreignKey: 'taskId',
      otherKey: 'tagId',
      // onDelete: 'CASCADE',
      // hooks: true
    });
    Task.hasMany(models.TaskTag, { foreignKey: 'taskId', onDelete: 'CASCADE', hooks: true });
  };
  return Task;
};