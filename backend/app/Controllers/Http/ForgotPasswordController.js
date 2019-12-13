"use strict";

const moment = require("moment");
const crypto = require("crypto");
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotPasswordController {
  /**
   * Create a new password
   * POST passwords
   */
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(
        ["emails.forgot_password", "emails.forgot_password-text"],
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from("kauagabrielsemenov@gmail.com", "Kaua | Real")
            .subject("Password recovery");
        }
      );
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "E-mail not found" } });
    }
  }

  /**
   * Update password details.
   * PUT properties
   */
  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: "Token Expired" } });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Error in reset password" } });
    }
  }
}

module.exports = ForgotPasswordController;
