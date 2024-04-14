const AuthenticateUserRepository = require('../repositories/AuthenticateUserRepository');

class AuthenticateUserController {
  async authenticate(request, response) {
    try {
      const { email, password } = request.body;

      const authenticateUserRepository = new AuthenticateUserRepository();

      const { user, token } = await authenticateUserRepository.execute({
        email,
        password,
      });

      return response.json({ user, token });
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthenticateUserController;
