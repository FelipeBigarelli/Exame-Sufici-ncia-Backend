const { hash } = require('bcrypt');

const AdminRepository = require('../repositories/AdminRepository');

const isPasswordValid = require('../../../utils/isPasswordValid');

class AdminController {
  async index(request, response) {
    const users = await AdminRepository.findAll();

    response.json(users);
  }

  async store(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const validatePassword = isPasswordValid(password);

    if (!validatePassword) {
      return response.status(400).json({ error: 'Password is not valid' });
    }

    const userExists = await AdminRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'Email already exists ' });
    }

    const passwordHash = await hash(password, 8);

    const user = await AdminRepository.create({ name, email, password: passwordHash });

    response.json(user);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await AdminRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, password } = request.body;

    const userExists = await AdminRepository.findById(id);
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

    const user = await AdminRepository.update(id, {
      name, password: passwordHash,
    });

    response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await AdminRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    await AdminRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new AdminController();
