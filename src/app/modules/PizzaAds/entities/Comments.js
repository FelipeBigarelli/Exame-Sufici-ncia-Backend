const { DataTypes } = require('sequelize');

const db = require('../../../../shared/database/index');

const Comments = db.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncremet: true,
    primaryKey: true,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
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

module.exports = Comments;
