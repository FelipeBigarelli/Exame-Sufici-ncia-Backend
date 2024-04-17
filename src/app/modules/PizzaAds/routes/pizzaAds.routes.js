const Router = require('express');
const multer = require('multer');

const ensureAuthenticated = require('../../../middlewares/ensureAuthenticated');
const uploadConfig = require('../../../config/upload');

const PizzaAdsController = require('../controllers/PizzaAdsController');
const CommentsController = require('../controllers/CommentsController');

const pizzaAdsRouter = Router();
const upload = multer(uploadConfig);

const pizzaAdsController = new PizzaAdsController();
const commentsController = new CommentsController();

pizzaAdsRouter.post('/new-ad', ensureAuthenticated, pizzaAdsController.store);

pizzaAdsRouter.post(
  '/ad/image/:id',
  ensureAuthenticated,
  upload.single('image'),
  pizzaAdsController.updateImage,
);

pizzaAdsRouter.get('/ads/filter', pizzaAdsController.filterPizzas);

pizzaAdsRouter.post('/ads/:id/comments', commentsController.store);

pizzaAdsRouter.post('/ads/:id/like', pizzaAdsController.likeAd);
pizzaAdsRouter.delete('/ads/:id/like', pizzaAdsController.removeLikeAd);

module.exports = pizzaAdsRouter;
