// routes/auth.routes.js
const express = require('express');
const db = require('../db');
const router = express.Router();
const bcrypt = require('bcryptjs');

/**
 * 🔹 ROUTE DEBUG : liste tous les utilisateurs
 */
router.get('/debug/users', (req, res) => {
  db.all('SELECT id, name, email, phone, user_type FROM users', [], (err, rows) => {
    if (err) {
      console.error('❌ Erreur DB:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('👥 Utilisateurs dans la base:', rows);
    res.json({ users: rows });
  });
});

/**
 * 🔹 INSCRIPTION UTILISATEUR
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, user_type } = req.body;

    // Validation des données
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Vérifier si l'email existe déjà
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) return res.status(500).json({ error: 'Erreur de base de données' });
      if (row) return res.status(400).json({ error: 'Cet email est déjà utilisé' });

      // Vérifier si le téléphone existe déjà
      db.get('SELECT id FROM users WHERE phone = ?', [phone], async (err, phoneRow) => {
        if (err) return res.status(500).json({ error: 'Erreur de base de données' });
        if (phoneRow) return res.status(400).json({ error: 'Ce numéro de téléphone est déjà utilisé' });

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer l'utilisateur
        const stmt = db.prepare(`
          INSERT INTO users (name, email, phone, password_hash, user_type)
          VALUES (?, ?, ?, ?, ?)
        `);
        
        stmt.run([name, email, phone, hashedPassword, user_type || 'client'], function (err) {
          if (err) {
            console.error('❌ Erreur insertion:', err);
            return res.status(500).json({ error: 'Erreur lors de la création du compte' });
          }
          res.status(201).json({
            success: true,
            message: 'Compte créé avec succès',
            user: { 
              id: this.lastID, 
              name, 
              email, 
              phone, 
              user_type: user_type || 'client' 
            }
          });
        });
        stmt.finalize();
      });
    });
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
});

/**
 * 🔹 CONNEXION UTILISATEUR
 */
router.post('/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/téléphone et mot de passe requis' });
  }

  // Chercher l'utilisateur par email ou téléphone
  db.get(
    'SELECT * FROM users WHERE email = ? OR phone = ?',
    [identifier, identifier],
    async (err, user) => {
      if (err) return res.status(500).json({ error: 'Erreur de base de données' });
      if (!user) return res.status(400).json({ error: 'Aucun compte trouvé avec ces informations' });

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Mot de passe incorrect' });
      }

      // Connexion réussie
      res.json({
        success: true,
        message: 'Connexion réussie',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          user_type: user.user_type,
        },
      });
    }
  );
});

/**
 * 🔹 VÉRIFICATION EXISTENCE UTILISATEUR
 */
router.post('/check-user', (req, res) => {
  const { identifier } = req.body;

  db.get(
    'SELECT id, email, phone FROM users WHERE email = ? OR phone = ?',
    [identifier, identifier],
    (err, user) => {
      if (err) return res.status(500).json({ error: 'Erreur de base de données' });
      res.json({ exists: !!user, user });
    }
  );
});

module.exports = router;
