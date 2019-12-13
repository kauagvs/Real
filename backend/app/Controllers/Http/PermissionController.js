"use strict";

const Permission = use("Permission");

class PermissionController {
  /**
   * Show a list of all permissions.
   * GET permissions
   */
  async index() {
    const permissions = await Permission.all();

    return permissions;
  }

  /**
   * Create/save a new permission.
   * POST permissions
   */
  async store({ request }) {
    const data = request.only(["name", "slug", "description"]);

    const permission = await Permission.create(data);

    return permission;
  }

  /**
   * Update permission details.
   * PUT permissions/:id
   */
  async update({ request, params }) {
    const data = request.only(["name", "slug", "description"]);

    const permission = await Permission.findOrFail(params.id);

    permission.merge(data);

    await permission.save();

    return permission;
  }

  /**
   * Delete a permission with id.
   * DELETE permissions/:id
   */
  async destroy({ params }) {
    const permission = await Permission.findOrFail(params.id);

    await permission.delete();
  }
}

module.exports = PermissionController;
