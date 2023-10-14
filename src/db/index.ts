import { Database } from 'bun:sqlite';

const db = new Database('db.sqlite');
db.run(
  `CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,
  checked INTEGER DEFAULT 0
)`
);

export default db;
