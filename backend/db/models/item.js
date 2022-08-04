'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    details: DataTypes.TEXT,
    sectionId: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.Section, { foreignKey: 'sectionId' });
  };
  return Item;
};