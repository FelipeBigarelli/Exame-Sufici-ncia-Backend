const Router = require('express');
const multer = require('multer');

const ensureAuthenticated = require('../../../middlewares/ensureAuthenticated');
const uploadConfig = require('../../../config/upload');

const PizzaAdsController = require('../controllers/PizzaAdsController');

const pizzaAdsRouter = Router();
const upload = multer(uploadConfig);

const pizzaAdsController = new PizzaAdsController();

pizzaAdsRouter.post('/new-ad', ensureAuthenticated, pizzaAdsController.store);

pizzaAdsRouter.post(
  '/ad/image/:id',
  ensureAuthenticated,
  upload.single('image'),
  pizzaAdsController.updateImage,
);

module.exports = pizzaAdsRouter;
