"use strict";

const Antl = use("Antl");

class PropertyStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: "required",
      address: "required",
      longitude: "required",
      latitude: "required",
      price: "required",
      type: "required"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = PropertyStore;
