const Users = require('../entities/Users');

class UsersRepository {
  async findById(id) {
    const userById = await Users.findOne({ where: { id } });

    return userById;
  }

  async findByEmail(email) {
    const userByEmail = await Users.findOne({ where: { email } });

    return userByEmail;
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
}

module.exports = new UsersRepository();
