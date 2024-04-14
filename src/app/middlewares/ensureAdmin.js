const Users = require('../modules/Users/entities/Users');
const AppError = require('../../shared/errors/AppError');

async function ensureAdmin(request, response, next) {
  try {
    const { id } = request.user;

    const user = await Users.findOne({ where: { id } });

    if (!user.isAdmin) {
      throw new AppError('User is not an Admin');
    }

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'User is not an Admin' });
  }
}

module.exports = ensureAdmin;
