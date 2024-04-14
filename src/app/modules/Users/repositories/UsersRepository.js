const Users = require('../entities/Users');

class UsersRepository {
  async findAll() {
    const users = await Users.findAll();
    return users;
  }

  async findById(id) {
    const userById = await Users.findOne({ where: { id } });
    return userById;
  }

  async findByEmail(email) {
    const userByEmail = await Users.findOne({ where: { email } });

    return userByEmail;
  }

  async createAdmin({
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

  async create({
    name, email, password, isAdmin,
  }) {
    // eslint-disable-next-line no-param-reassign
    isAdmin = false;

    const user = await Users.create({
      name,
      email,
      password,
      isAdmin,
    });

    return user;
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

  async updateAdmin(id, {
    name, password, email,
  }) {
    const user = await Users.findOne({ where: { id } });

    if (user) {
      await user.update({
        name,
        password,
        email,
      });
    }

    return user;
  }

  async delete(id) {
    const user = await Users.findOne({ where: { id } });

    await user.destroy();
  }
}

module.exports = new UsersRepository();
