/* =============================================
   PROJECT-4 | models/User.js
   All database queries for the Users table
   ============================================= */

const { getDb } = require('../config/database');

const User = {

  /**
   * READ — Get all users (with optional search)
   */
  findAll(search = '') {
    const db = getDb();
    if (search) {
      return db.prepare(`
        SELECT id, name, email, role, created_at, updated_at
        FROM users
        WHERE name  LIKE ? OR email LIKE ? OR role LIKE ?
        ORDER BY id DESC
      `).all(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    return db.prepare(`
      SELECT id, name, email, role, created_at, updated_at
      FROM users
      ORDER BY id DESC
    `).all();
  },

  /**
   * READ — Get a single user by ID
   */
  findById(id) {
    return getDb()
      .prepare('SELECT * FROM users WHERE id = ?')
      .get(id);
  },

  /**
   * READ — Get user by email (for duplicate check)
   */
  findByEmail(email, excludeId = null) {
    const db = getDb();
    if (excludeId) {
      return db.prepare('SELECT id FROM users WHERE email = ? AND id != ?')
               .get(email, excludeId);
    }
    return db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  },

  /**
   * CREATE — Insert a new user
   */
  create({ name, email, role = 'user' }) {
    const db = getDb();
    const result = db.prepare(`
      INSERT INTO users (name, email, role)
      VALUES (?, ?, ?)
    `).run(name.trim(), email.trim().toLowerCase(), role);

    return this.findById(result.lastInsertRowid);
  },

  /**
   * UPDATE — Modify an existing user
   */
  update(id, { name, email, role }) {
    const db = getDb();
    db.prepare(`
      UPDATE users
      SET name = ?, email = ?, role = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(name.trim(), email.trim().toLowerCase(), role, id);

    return this.findById(id);
  },

  /**
   * DELETE — Remove a user by ID
   */
  delete(id) {
    const result = getDb()
      .prepare('DELETE FROM users WHERE id = ?')
      .run(id);
    return result.changes > 0;
  },

  /**
   * STATS — Summary counts
   */
  getStats() {
    const db = getDb();
    const total   = db.prepare('SELECT COUNT(*) as n FROM users').get().n;
    const admins  = db.prepare("SELECT COUNT(*) as n FROM users WHERE role = 'admin'").get().n;
    const editors = db.prepare("SELECT COUNT(*) as n FROM users WHERE role = 'editor'").get().n;
    const latest  = db.prepare('SELECT name FROM users ORDER BY id DESC LIMIT 1').get();
    return { total, admins, editors, latest: latest?.name || null };
  },
};

module.exports = User;
