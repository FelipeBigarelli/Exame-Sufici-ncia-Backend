const Router = require('express');
const AuthenticateUserController = require('../controllers/AuthenticateUserController');

const sessionRouter = Router();

sessionRouter.post('/auth', AuthenticateUserController.authenticate);

module.exports = sessionRouter;
