const Router = require('express');
const AuthenticateUserController = require('../controllers/AuthenticateUserController');

const sessionRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionRouter.post('/auth', authenticateUserController.authenticate);

module.exports = sessionRouter;
