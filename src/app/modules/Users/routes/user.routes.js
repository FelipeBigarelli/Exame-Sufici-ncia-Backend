const Router = require('express');

const UserController = require('../controllers/UserController');

const ensureAuthenticated = require('../../../middlewares/ensureAuthenticated');

const userRouter = Router();

const userController = new UserController();

userRouter.post('/users/create', userController.store);
userRouter.put('/user', ensureAuthenticated, userController.update);

module.exports = userRouter;
