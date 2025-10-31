// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

// ✅ Middleware
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

// ✅ Routes d’authentification
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// ✅ Routes des chauffeurs
const driverRoutes = require('./routes/drivers');
app.use('/api/drivers', driverRoutes);

// ✅ Routes de test utilisateurs
app.get('/api/users', (req, res) => {
  db.all('SELECT id, name, email, user_type FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email, password_hash, user_type } = req.body;
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash, user_type)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run([name, email, password_hash, user_type], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email, user_type });
  });
  stmt.finalize();
});

// ✅ Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
});
