const express = require('express');
const db = require('../db');
const router = express.Router();

// 🔹 Route pour trouver un chauffeur disponible - VERSION TESTÉE
router.get('/available', (req, res) => {
  const { service } = req.query;

  console.log('🔍 Recherche chauffeur pour service:', service);

  try {
    // REQUÊTE AVEC les bonnes colonnes
    const sql = `
      SELECT 
        id, 
        name, 
        phone, 
        car_model, 
        plate_number, 
        location_lat as latitude, 
        location_lng as longitude,
        4.5 as rating
      FROM drivers 
      WHERE available = 1 
      LIMIT 1
    `;
    
    console.log('📋 Exécution SQL:', sql);
    
    db.get(sql, [], (err, row) => {
      if (err) {
        console.error('❌ Erreur SQL drivers:', err.message);
        return res.status(500).json({ 
          message: 'Erreur de base de données',
          error: err.message 
        });
      }

      console.log('📊 Résultat DB:', row);

      if (!row) {
        console.log('❌ Aucun chauffeur disponible dans la base');
        return res.status(404).json({ 
          message: 'Aucun chauffeur disponible',
          details: 'Vérifiez que la table drivers contient des chauffeurs avec available=1'
        });
      }

      console.log('✅ Chauffeur trouvé:', row.name);
      
      // FORMATAGE CORRECT des données
      const driver = {
        id: row.id,
        name: row.name,
        phone: row.phone,
        car_model: row.car_model,
        plate_number: row.plate_number,
        latitude: row.latitude,
        longitude: row.longitude,
        rating: row.rating
      };
      
      res.json({ driver });
    });

  } catch (error) {
    console.error('❌ Erreur interne drivers:', error);
    res.status(500).json({ 
      message: 'Erreur interne du serveur',
      error: error.message 
    });
  }
});

module.exports = router;
