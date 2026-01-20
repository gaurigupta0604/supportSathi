import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct DB path (inside backend/db)
const dbPath = path.join(__dirname, "supportsathi.db");

const db = new Database(dbPath);

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS emergencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;
