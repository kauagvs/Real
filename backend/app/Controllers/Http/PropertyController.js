"use strict";

const Property = use("App/Models/Property");

class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   */
  async index({ request, auth }) {
    const user = await auth.getUser();

    if (await user.can("read_private_property")) {
      const { latitude, longitude } = request.all();
      const { page } = request.get();

      const properties = Property.query()
        .with("images")
        .nearBy(latitude, longitude, 10)
        .paginate(page);

      return properties;
    }

    const properties = await Property.query()
      .where({ type: "public" })
      .fetch();
    return properties;
  }

  /**
   * Display a single property.
   * GET properties/:id
   */
  async show({ params }) {
    const property = await Property.findOrFail(params.id);

    await property.load("images");

    return property;
  }

  /**
   * Create/save a new property.
   * POST properties
   */
  async store({ auth, request }) {
    const { id } = auth.user;
    const data = request.only([
      "title",
      "address",
      "latitude",
      "longitude",
      "price",
      "type"
    ]);

    const property = await Property.create({ ...data, user_id: id });

    return property;
  }

  /**
   * Update property details.
   * PUT properties/:id
   */
  async update({ params, request, response }) {
    const property = await Property.findOrFail(params.id);

    const data = request.only([
      "title",
      "address",
      "latitude",
      "longitude",
      "price",
      "type"
    ]);

    property.merge(data);

    await property.save();

    return property;
  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   */
  async destroy({ params, response }) {
    const property = await Property.findOrFail(params.id);

    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }

    await property.delete();
  }
}

module.exports = PropertyController;
