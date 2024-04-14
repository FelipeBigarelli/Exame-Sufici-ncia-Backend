const { DataTypes } = require('sequelize');

const db = require('../../../../shared/database/index');

const PizzaAdsImages = db.define('pizza_ads_images', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pizzaAdId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pizza_ads',
      key: 'id',
    },
  },
  pizzaImageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pizza_images',
      key: 'id',
    },
  },
});

module.exports = PizzaAdsImages;
