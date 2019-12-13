"use strict";

const Role = use("Role");

class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   */
  async index() {
    const roles = await Role.query()
      .with("permissions")
      .fetch();

    return roles;
  }

  /**
   * Display a single property.
   * GET properties/:id
   */
  async show({ params }) {
    const role = await Role.findOrFail(params.id);

    await role.load("permissions");

    return role;
  }

  /**
   * Create/save a new role.
   * POST roles
   */
  async store({ request }) {
    const { permissions, ...data } = request.only([
      "name",
      "slug",
      "description",
      "permissions"
    ]);

    const role = await Role.create(data);

    if (permissions) {
      await role.permissions().attach(permissions);
    }

    await role.load("permissions");

    return role;
  }

  /**
   * Update role details.
   * PUT roles/:id
   */
  async update({ request, params }) {
    const { permissions, ...data } = request.only([
      "name",
      "slug",
      "description",
      "permissions"
    ]);

    const role = await Role.findOrFail(params.id);

    role.merge(data);

    await role.save();

    if (permissions) {
      await role.permissions().sync(permissions);
    }

    await role.load("permissions");

    return role;
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   */
  async destroy({ params }) {
    const role = await Role.findOrFail(params.id);

    await role.delete();
  }
}

module.exports = RoleController;
