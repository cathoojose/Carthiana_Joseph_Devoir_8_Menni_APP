// backend/init_drivers.js - VERSION CORRIGÉE
const db = require('./db');

db.serialize(() => {
  console.log('🚗 Initialisation de la base de données...');

  // ✅ CORRECTION: phone TEXT au lieu de phone REAL
  db.run(`
    CREATE TABLE IF NOT EXISTS drivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,  // CHANGÉ DE REAL À TEXT
      car_model TEXT NOT NULL,
      plate_number TEXT NOT NULL,
      location_lat REAL,
      location_lng REAL,
      available INTEGER DEFAULT 1
    )
  `, (err) => {
    if (err) {
      console.error('❌ Erreur création table drivers:', err.message);
    } else {
      console.log('Table "drivers" prête');
    }
  });

  // VIDER la table avant de réinsérer (éviter les doublons)
  db.run('DELETE FROM drivers', (err) => {
    if (err) console.error('❌ Erreur suppression données:', err.message);
    else console.log('Anciennes données supprimées');
  });

  //  CORRECTION: Numéros sans tirets pour éviter les problèmes
  const insert = `
    INSERT INTO drivers (name, phone, car_model, plate_number, location_lat, location_lng, available)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const drivers = [
    ['Jean Pierre', '50912345678', 'Toyota Corolla', 'AA-1234', 18.5392, -72.3364, 1],
    ['Marie Louis', '50987654321', 'Hyundai Elantra', 'BB-5678', 18.5500, -72.3400, 1],
    ['David Joseph', '50999887766', 'Kia Rio', 'CC-9876', 18.5450, -72.3300, 0]
  ];

  let inserted = 0;
  drivers.forEach((d) => {
    db.run(insert, d, (err) => {
      if (err) {
        console.error('❌ Erreur insertion:', err.message);
      } else {
        inserted++;
        console.log(`Chauffeur ${d[0]} inséré`);
        
        // NE PAS FERMER LA BASE ICI - laisser le serveur l'utiliser
        if (inserted === drivers.length) {
          console.log(`🚀 ${inserted} chauffeurs insérés avec succès.`);
          console.log('💾 Base de données prête pour le serveur.');
          // SUPPRIMER db.close() - le serveur a besoin de la connexion
        }
      }
    });
  });
});

