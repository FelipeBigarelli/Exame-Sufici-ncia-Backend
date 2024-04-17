const Router = require('express');

const UsersController = require('../controllers/UsersController');

const ensureAuthenticated = require('../../../middlewares/ensureAuthenticated');
const ensureAdmin = require('../../../middlewares/ensureAdmin');

const userRouter = Router();

const userController = new UsersController();

// Admin routes
userRouter.get('/users', ensureAuthenticated, ensureAdmin, userController.index);
userRouter.post('/admin/create', userController.storeAdmin);
userRouter.post('/admin/users/create', userController.store);
userRouter.put('/admin/user/:id', ensureAuthenticated, ensureAdmin, userController.updateAdmin);
userRouter.delete('/users/:id', ensureAuthenticated, ensureAdmin, userController.delete);

// User routes
userRouter.get('/users/:id', ensureAuthenticated, userController.show);
userRouter.post('/users/create', userController.store);
userRouter.put('/user', ensureAuthenticated, userController.update);
userRouter.put('/users/:id', ensureAuthenticated, userController.update);

module.exports = userRouter;
