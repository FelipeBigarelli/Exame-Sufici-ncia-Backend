const Users = require('../entities/Users');

class AdminRepository {
  async findAll() {
    const users = await Users.findAll();
    return users;
  }

  async findById(id) {
    const userById = await Users.findOne({ where: { id } });

    return userById;
  }

  async create({
    name, email, password,
  }) {
    const user = await Users.create({
      name,
      email,
      password,
      isAdmin: true,
    });

    return user;
  }

  async findByEmail(email) {
    const userByEmail = await Users.findOne({ where: { email } });

    return userByEmail;
  }

  async update(id, {
    name, password,
  }) {
    const user = await Users.findOne({ where: { id } });

    if (user) {
      await user.update({
        name,
        password,
      });
    }

    return user;
  }

  async delete(id) {
    const user = await Users.findOne({ where: { id } });

    await user.destroy();
  }
}

module.exports = new AdminRepository();
