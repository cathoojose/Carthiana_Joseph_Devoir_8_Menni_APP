// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crée/ouvre la base dans le dossier backend
const dbPath = path.resolve(__dirname, 'menni.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur de connexion à SQLite:', err.message);
  } else {
    console.log('✅ Connecté à la base SQLite:', dbPath);
  }
});

// Active les clés étrangères (important pour les relations)
db.run('PRAGMA foreign_keys = ON;');

module.exports = db;

