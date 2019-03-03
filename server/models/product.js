'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
};