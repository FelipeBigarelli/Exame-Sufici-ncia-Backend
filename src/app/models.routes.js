const Router = require('express');

const db = require('../shared/database/index');

const AppError = require('../shared/errors/AppError');

const Users = require('./modules/Users/entities/Users');
const PizzaAds = require('./modules/PizzaAds/entities/PizzaAds');
const PizzaImages = require('./modules/PizzaAds/entities/PizzaImages');
const PizzaAdsImages = require('./modules/PizzaAds/entities/PizzaAdsImages');

const modelsRouter = Router();

modelsRouter.post('/models', async (request, response) => {
  try {
    PizzaAds.belongsTo(Users, { foreignKey: 'userId' });
    Users.hasMany(PizzaAds, { foreignKey: 'userId' });
    PizzaAds.belongsToMany(PizzaImages, { through: PizzaAdsImages });
    PizzaImages.belongsToMany(PizzaAds, { through: PizzaAdsImages });

    await db.sync();

    response.sendStatus(200);
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(401).json({ error: error.message });
    }
  }
});

module.exports = modelsRouter;
