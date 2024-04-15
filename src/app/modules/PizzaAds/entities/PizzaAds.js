const { DataTypes } = require('sequelize');

const db = require('../../../../shared/database/index');

const PizzaAds = db.define('pizza_ads', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ingredients: {
    type: DataTypes.TEXT, // Usando TEXT para armazenar dados serializados
    allowNull: false,
    get() {
      const ingredientsString = this.getDataValue('ingredients');
      return ingredientsString ? JSON.parse(ingredientsString) : [];
    },
    set(val) {
      this.setDataValue('ingredients', JSON.stringify(val));
    },
  },

  image: {
    type: DataTypes.BLOB,
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

module.exports = PizzaAds;
