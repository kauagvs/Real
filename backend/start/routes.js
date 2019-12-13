"use strict";

const Route = use("Route");

Route.post("users", "UserController.store").validator("User");

Route.put("users/:id", "UserController.update").middleware("auth");

Route.post("sessions", "SessionController.store").validator("Session");

Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

Route.resource("properties", "PropertyController")
  .apiOnly()
  .except(["index", "show"])
  .middleware(["auth", "is: (administrator || moderator)"])
  .validator(
    new Map([
      [["properties.store"], ["Property/Store"]],
      [["properties.update"], ["Property/Update"]]
    ])
  );

Route.get("properties", "PropertyController.index").validator("Property/Index");

Route.get("properties/:id", "PropertyController.show");

Route.post("properties/:id/images", "ImageController.store").middleware("auth");

Route.get("images/:path", "ImageController.show");

Route.get("files/:id", "FileController.show");
Route.post("files", "FileController.store");

Route.resource("permissions", "PermissionController")
  .apiOnly()
  .middleware("auth");

Route.resource("roles", "RoleController")
  .apiOnly()
  .middleware("auth");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});
