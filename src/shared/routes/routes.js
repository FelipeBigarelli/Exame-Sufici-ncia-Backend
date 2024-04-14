const express = require('express');

const userRouter = require('../../app/modules/Users/routes/user.routes');
const sessionRouter = require('../../app/modules/Users/routes/sessions.routes');
const modelsRouter = require('../../app/models.routes');
const pizzaAdsRouter = require('../../app/modules/PizzaAds/routes/pizzaAds.routes');

const router = express();

router.use(modelsRouter);
router.use(sessionRouter);
router.use(userRouter);
router.use(pizzaAdsRouter);

module.exports = router;
