const { hash } = require('bcrypt');

const isPasswordValid = require('../../../utils/isPasswordValid');
const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async store(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const validatePassword = isPasswordValid(password);
    if (!validatePassword) {
      return response.status(400).json({ error: 'Password is not valid' });
    }

    const userExists = await UsersRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'Email already exists ' });
    }

    const passwordHash = await hash(password, 8);

    const user = await UsersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    response.json(user);
  }

  async update(request, response) {
    const { id } = request.user;
    const { name, password } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      response.status(404).json({ error: 'User not found' });
    }

    const validatePassword = isPasswordValid(password);

    if (!validatePassword) {
      return response.status(400).json({ error: 'Password is not valid' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const passwordHash = await hash(password, 8);

    const user = await UsersRepository.update(id, {
      name,
      password: passwordHash,
    });

    response.json(user);
  }
}

module.exports = UserController;
