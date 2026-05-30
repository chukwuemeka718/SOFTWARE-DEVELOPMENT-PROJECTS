/* =============================================
   PROJECT-4 | models/User.js
   All database queries for the Users table
   ============================================= */

const { getDb } = require('../config/database');

// Helper: run a query that returns multiple rows
function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// Helper: run a query that returns one row
function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

// Helper: run INSERT / UPDATE / DELETE
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

const User = {

  // READ — all users (with optional search)
  async findAll(search = '') {
    if (search) {
      return all(
        `SELECT id, name, email, role, created_at, updated_at
         FROM users
         WHERE name LIKE ? OR email LIKE ? OR role LIKE ?
         ORDER BY id DESC`,
        [`%${search}%`, `%${search}%`, `%${search}%`]
      );
    }
    return all(
      `SELECT id, name, email, role, created_at, updated_at
       FROM users ORDER BY id DESC`
    );
  },

  // READ — single user by ID
  async findById(id) {
    return get('SELECT * FROM users WHERE id = ?', [id]);
  },

  // READ — by email (for duplicate check)
  async findByEmail(email, excludeId = null) {
    if (excludeId) {
      return get('SELECT id FROM users WHERE email = ? AND id != ?', [email, excludeId]);
    }
    return get('SELECT id FROM users WHERE email = ?', [email]);
  },

  // CREATE
  async create({ name, email, role = 'user' }) {
    const result = await run(
      'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
      [name.trim(), email.trim().toLowerCase(), role]
    );
    return this.findById(result.lastID);
  },

  // UPDATE
  async update(id, { name, email, role }) {
    await run(
      `UPDATE users SET name = ?, email = ?, role = ?,
       updated_at = datetime('now') WHERE id = ?`,
      [name.trim(), email.trim().toLowerCase(), role, id]
    );
    return this.findById(id);
  },

  // DELETE
  async delete(id) {
    const result = await run('DELETE FROM users WHERE id = ?', [id]);
    return result.changes > 0;
  },

  // STATS
  async getStats() {
    const total   = await get('SELECT COUNT(*) as n FROM users');
    const admins  = await get("SELECT COUNT(*) as n FROM users WHERE role = 'admin'");
    const editors = await get("SELECT COUNT(*) as n FROM users WHERE role = 'editor'");
    const latest  = await get('SELECT name FROM users ORDER BY id DESC LIMIT 1');
    return {
      total:   total.n,
      admins:  admins.n,
      editors: editors.n,
      latest:  latest ? latest.name : null,
    };
  },
};

module.exports = User;
