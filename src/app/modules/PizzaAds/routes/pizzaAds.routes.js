const Router = require('express');
const multer = require('multer');

const ensureAuthenticated = require('../../../middlewares/ensureAuthenticated');
const uploadConfig = require('../../../config/upload');

const UploadPizzaAdsImagesController = require('../controllers/UploadPizzaAdsImagesController');
const PizzaAdsController = require('../controllers/PizzaAdsController');

const pizzaAdsRouter = Router();
const upload = multer(uploadConfig);

const uploadPizzaAdsImagesController = new UploadPizzaAdsImagesController();
const pizzaAdsController = new PizzaAdsController();

pizzaAdsRouter.post('/new-ad', ensureAuthenticated, pizzaAdsController.store);

pizzaAdsRouter.post(
  '/ads/images/:id',
  ensureAuthenticated,
  upload.array('images'),
  uploadPizzaAdsImagesController.store,
);

module.exports = pizzaAdsRouter;
