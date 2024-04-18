const { hash } = require('bcrypt');

const isPasswordValid = require('../../../utils/isPasswordValid');
const UsersRepository = require('../repositories/UsersRepository');

class UsersController {
  async index(request, response) {
    const users = await UsersRepository.findAll();

    return response.json(users);
  }

  async store(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const validatePassword = isPasswordValid(password);
    if (!validatePassword) {
      return response.status(400).json({ error: 'Password must be numbers/strings' });
    }

    const userExists = await UsersRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'Email already exists' });
    }

    const passwordHash = await hash(password, 8);

    const user = await UsersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return response.json(user);
  }

  async storeAdmin(request, response) {
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

    const user = await UsersRepository.createAdmin({
      name,
      email,
      password: passwordHash,
    });

    return response.json(user);
  }

  async show(request, response) {
    const { id } = request.params;
    const { id: reqUserId } = request.user;
    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (id !== reqUserId) {
      return response.status(400).json({ error: 'User does not have permissions' });
    }

    return response.json(user);
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

    return response.json(user);
  }

  async updateAdmin(request, response) {
    const { id } = request.params;
    const { name, password, email } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    const emailAlreadyExists = await UsersRepository.findByEmail(email);

    if (emailAlreadyExists && emailAlreadyExists.email !== id) {
      return response.status(400).json({ error: 'E-mail already in use' });
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
      email,
      password: passwordHash,
    });

    return response.send(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    await UsersRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = UsersController;
