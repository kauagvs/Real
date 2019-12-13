"use strict";

const Antl = use("Antl");

class PropertyIndex {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      longitude: "required",
      latitude: "required"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = PropertyIndex;
