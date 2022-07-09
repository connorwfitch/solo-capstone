'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskTag = sequelize.define('TaskTag', {
    taskId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  TaskTag.associate = function(models) {
    TaskTag.belongsTo(models.Task, { foreignKey: 'taskId'});
    TaskTag.belongsTo(models.Tag, { foreignKey: 'tagId' });
  };
  return TaskTag;
};