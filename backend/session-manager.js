const crypto = require("crypto");

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  create(metadata = {}) {
    const id = crypto.randomUUID();

    const session = {
      id,
      createdAt: new Date().toISOString(),
      metadata
    };

    this.sessions.set(id, session);

    return session;
  }

  get(id) {
    return this.sessions.get(id) || null;
  }

  remove(id) {
    return this.sessions.delete(id);
  }

  list() {
    return Array.from(this.sessions.values());
  }

  clear() {
    this.sessions.clear();
  }
}

module.exports = SessionManager;
