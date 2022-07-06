'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    title: DataTypes.STRING,
    color: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.User, { foreignKey: 'userId' });
    Tag.belongsToMany(models.Task, {
      through: 'TaskTag',
      foreignKey: 'tagId',
      otherKey: 'taskId'
    });
  };
  return Tag;
};