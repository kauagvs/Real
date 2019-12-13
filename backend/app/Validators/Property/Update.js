"use strict";

const Antl = use("Antl");

class PropertyUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: "required",
      address: "required",
      longitude: "required",
      latitude: "required",
      price: "required"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = PropertyUpdate;
