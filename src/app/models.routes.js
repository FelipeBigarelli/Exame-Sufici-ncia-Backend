const Router = require('express');

const db = require('../shared/database/index');

const AppError = require('../shared/errors/AppError');

const Users = require('./modules/Users/entities/Users');
const PizzaAds = require('./modules/PizzaAds/entities/PizzaAds');
const Comments = require('./modules/PizzaAds/entities/Comments');

const modelsRouter = Router();

modelsRouter.post('/models', async (request, response) => {
  try {
    Users.hasMany(PizzaAds, { foreignKey: 'userId' });
    PizzaAds.belongsTo(Users, { foreignKey: 'userId' });
    Comments.belongsTo(PizzaAds, { foreignKey: 'adId' });

    await db.sync();

    response.sendStatus(200);
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(401).json({ error: error.message });
    }
  }
});

module.exports = modelsRouter;
