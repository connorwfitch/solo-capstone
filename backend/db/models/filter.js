'use strict';
module.exports = (sequelize, DataTypes) => {
  const Filter = sequelize.define('Filter', {
    title: DataTypes.STRING,
    color: DataTypes.STRING,
    query: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Filter.associate = function(models) {
    Filter.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Filter;
};