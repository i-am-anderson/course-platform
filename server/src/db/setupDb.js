import { openDb } from "./db.js";

async function setup() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('single', 'multiple')),
      feedback TEXT NOT NULL
      );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      is_correct BOOLEAN DEFAULT 0,
      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
    );
  `);

  console.log("Done!");
}

setup();
