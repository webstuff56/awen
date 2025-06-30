// db.js (ESM compatible)
import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./awen.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
});

export default db;
