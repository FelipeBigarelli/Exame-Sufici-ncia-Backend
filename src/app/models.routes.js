const Router = require('express');

const db = require('../shared/database/index');

const AppError = require('../shared/errors/AppError');

const Users = require('./modules/Users/entities/Users');
const PizzaAds = require('./modules/PizzaAds/entities/PizzaAds');
const Comments = require('./modules/PizzaAds/entities/Comments');

const modelsRouter = Router();

modelsRouter.post('/models', async (request, response) => {
  try {
    PizzaAds.belongsTo(Users, { foreignKey: 'userId' });
    PizzaAds.belongsToMany(Users, { through: 'Likes', as: 'likedBy' });
    Comments.belongsTo(PizzaAds, { foreignKey: 'adId' });
    Users.hasMany(PizzaAds, { foreignKey: 'userId' });

    await db.sync();

    response.sendStatus(200);
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(401).json({ error: error.message });
    }
  }
});

module.exports = modelsRouter;
