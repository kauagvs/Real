"use strict";

const Database = use("Database");
const User = use("App/Models/User");

class UserController {
  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request }) {
    const { permissions, roles, ...data } = request.only([
      "username",
      "email",
      "password",
      "permissions",
      "roles"
    ]);

    const trx = await Database.beginTransaction();

    const user = await User.create(data, trx);

    if (roles) {
      await user.roles().attach(roles);
    }

    if (permissions) {
      await user.permissions().attach(permissions);
    }

    if (roles || permissions) {
      await user.loadMany(["permissions", "roles"]);
    }

    await trx.commit();

    return user;
  }

  /**
   * Update user details.
   * PUT users/:id
   */
  async update({ request, params }) {
    const { permissions, roles, ...data } = request.only([
      "username",
      "email",
      "password",
      "permissions",
      "roles"
    ]);

    const trx = await Database.beginTransaction();

    const user = await User.findOrFail(params.id, trx);

    user.merge(data);

    await user.save();

    if (roles) {
      await user.roles().sync(roles);
    }

    if (permissions) {
      await user.permissions().sync(permissions);
    }

    await user.loadMany(["permissions", "roles"]);

    await trx.commit();

    return user;
  }
}

module.exports = UserController;
