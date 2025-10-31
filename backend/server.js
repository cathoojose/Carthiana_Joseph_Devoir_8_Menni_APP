// server.js
const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');

app.use(cors()); // ✅ Autorise les requêtes venant du frontend mobile
app.use(express.json());

// ✅ Importation des routes d’authentification
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// ✅ Exemple : obtenir tous les utilisateurs
app.get('/api/users', (req, res) => {
  db.all('SELECT id, name, email, user_type FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ✅ Exemple : créer un utilisateur
app.post('/api/users', (req, res) => {
  const { name, email, password_hash, user_type } = req.body;
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash, user_type)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run([name, email, password_hash, user_type], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, user_type });
  });
  stmt.finalize();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
});
