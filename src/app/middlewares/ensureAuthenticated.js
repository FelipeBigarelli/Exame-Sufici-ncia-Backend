const { verify } = require('jsonwebtoken');

const authConfig = require('../config/auth');
const AppError = require('../../shared/errors/AppError');

function ensureAuthenticated(
  request,
  response,
  next,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}

module.exports = ensureAuthenticated;
