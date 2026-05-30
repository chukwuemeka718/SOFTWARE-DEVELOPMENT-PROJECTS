/* =============================================
   PROJECT-4 | config/database.js
   SQLite database connection & schema setup
   ============================================= */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'database.sqlite');

let db;

function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) return reject(err);
      console.log('✅ Database connected: ' + DB_PATH);
    });

    db.serialize(() => {
      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id         INTEGER PRIMARY KEY AUTOINCREMENT,
          name       TEXT    NOT NULL,
          email      TEXT    NOT NULL UNIQUE,
          role       TEXT    NOT NULL DEFAULT 'user',
          created_at TEXT    NOT NULL DEFAULT (datetime('now')),
          updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
        )
      `);

      // Seed only if empty
      db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (err) return;
        if (row.count === 0) {
          const stmt = db.prepare('INSERT INTO users (name, email, role) VALUES (?, ?, ?)');
          stmt.run('Amara Okafor',  'amara@example.com',  'admin');
          stmt.run('Chidi Eze',     'chidi@example.com',  'editor');
          stmt.run('Ngozi Adeyemi', 'ngozi@example.com',  'user');
          stmt.run('Emeka Nwosu',   'emeka@example.com',  'viewer');
          stmt.finalize();
          console.log('✅ Database seeded with 4 sample users.');
        }
        resolve(db);
      });
    });
  });
}

function getDb() {
  if (!db) throw new Error('Database not initialized.');
  return db;
}

module.exports = { initDatabase, getDb };
