const { DataTypes } = require('sequelize');

const db = require('../../../../shared/database/index');

const PizzaImages = db.define('pizza_images', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  pizzaAdId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pizza_ads',
      key: 'id',
    },
  },
});

module.exports = PizzaImages;
