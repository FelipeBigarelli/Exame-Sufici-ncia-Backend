const { DataTypes } = require('sequelize');
const db = require('../../../../shared/database/index');

const Likes = db.define('likes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  adId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pizza_ads',
      key: 'id',
    },
  },
});

module.exports = Likes;
