const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const authConfig = require('../../../config/auth');
const AppError = require('../../../../shared/errors/AppError');

const Users = require('../entities/Users');

class AuthenticateUserRepository {
  async execute({ email, password }) {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid email/password');
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

module.exports = AuthenticateUserRepository;
