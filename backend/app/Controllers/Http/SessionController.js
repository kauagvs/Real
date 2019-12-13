"use strict";

class SessionController {
  /**
   * Create/save a new session.
   * POST sessions
   */
  async store({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = SessionController;
