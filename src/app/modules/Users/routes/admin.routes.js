const Router = require('express');

const AdminController = require('../controllers/AdminController');
const ensureAuthenticated = require('../../../middlewares/ensureAuthenticated');
const ensureAdmin = require('../../../middlewares/ensureAdmin');

const adminRouter = Router();

adminRouter.get('/users', ensureAuthenticated, ensureAdmin, AdminController.index);
adminRouter.get('/users/:id', ensureAuthenticated, AdminController.show);
adminRouter.post('/admin/create', AdminController.store);
adminRouter.put('/users/:id', ensureAuthenticated, ensureAdmin, AdminController.update);
adminRouter.delete('/users/:id', ensureAuthenticated, ensureAdmin, AdminController.delete);

module.exports = adminRouter;
