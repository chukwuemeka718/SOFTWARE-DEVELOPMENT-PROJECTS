/* =============================================
   PROJECT-4 | config/database.js
   SQLite database connection & schema setup
   ============================================= */

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'database.sqlite');

let db;

/**
 * Initialize the database connection and create tables if they don't exist.
 */
function initDatabase() {
  db = new Database(DB_PATH);

  // Enable WAL mode for better concurrent performance
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // ─── Schema: Users Table ───────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL UNIQUE,
      role       TEXT    NOT NULL DEFAULT 'user'
                         CHECK(role IN ('user', 'admin', 'editor', 'viewer')),
      created_at TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ─── Seed Data (only if table is empty) ───────
  const count = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (count.count === 0) {
    const insert = db.prepare(
      `INSERT INTO users (name, email, role) VALUES (?, ?, ?)`
    );
    const seedMany = db.transaction((users) => {
      for (const u of users) insert.run(u.name, u.email, u.role);
    });
    seedMany([
      { name: 'Amara Okafor',  email: 'amara@example.com',  role: 'admin'  },
      { name: 'Chidi Eze',     email: 'chidi@example.com',  role: 'editor' },
      { name: 'Ngozi Adeyemi', email: 'ngozi@example.com',  role: 'user'   },
      { name: 'Emeka Nwosu',   email: 'emeka@example.com',  role: 'viewer' },
    ]);
    console.log('✅ Database seeded with 4 sample users.');
  }

  console.log(`✅ Database connected: ${DB_PATH}`);
  return db;
}

function getDb() {
  if (!db) throw new Error('Database not initialized. Call initDatabase() first.');
  return db;
}

module.exports = { initDatabase, getDb };
