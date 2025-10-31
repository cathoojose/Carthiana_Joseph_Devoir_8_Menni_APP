// backend/fix_drivers_phone.js - VERSION COMPLÈTE DE RECONSTRUCTION
const db = require('./db');

console.log('RECONSTRUCTION COMPLÈTE DE LA TABLE DRIVERS...');

// 1. Supprimer l'ancienne table
db.run('DROP TABLE IF EXISTS drivers', (dropErr) => {
  if (dropErr) {
    console.error('❌ Erreur suppression table:', dropErr.message);
    return;
  }
  
  console.log('Ancienne table supprimée');
  
  // 2. Créer la nouvelle table avec la structure COMPLÈTE
  const createSQL = `
    CREATE TABLE drivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      car_model TEXT NOT NULL,
      plate_number TEXT NOT NULL,
      location_lat REAL,
      location_lng REAL,
      available INTEGER DEFAULT 1
    )
  `;
  
  db.run(createSQL, (createErr) => {
    if (createErr) {
      console.error('❌ Erreur création table:', createErr.message);
      return;
    }
    
    console.log('Nouvelle table créée avec structure complète');
    
    // 3. Insérer les données de test COMPLÈTES
    const drivers = [
      ['Jean Pierre', '50912345678', 'Toyota Corolla', 'AA-1234', 18.5392, -72.3364, 1],
      ['Marie Louis', '50987654321', 'Hyundai Elantra', 'BB-5678', 18.5500, -72.3400, 1],
      ['David Joseph', '50999887766', 'Kia Rio', 'CC-9876', 18.5450, -72.3300, 0]
    ];
    
    let inserted = 0;
    
    drivers.forEach(driver => {
      const sql = `INSERT INTO drivers (name, phone, car_model, plate_number, location_lat, location_lng, available) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      
      db.run(sql, driver, function(insertErr) {
        if (insertErr) {
          console.error(`❌ Erreur insertion ${driver[0]}:`, insertErr.message);
        } else {
          inserted++;
          console.log(`✅ ${driver[0]} inséré (ID: ${this.lastID})`);
        }
        
        if (inserted === drivers.length) {
          console.log(`🎉 ${inserted} chauffeurs insérés!`);
          
          // 4. Vérifier la structure finale
          verifyFinalStructure();
        }
      });
    });
  });
});

function verifyFinalStructure() {
  console.log('\n🔍 VÉRIFICATION DE LA STRUCTURE FINALE:');
  
  // Vérifier les colonnes
  db.all("PRAGMA table_info(drivers)", (err, columns) => {
    if (err) {
      console.error('❌ Erreur vérification structure:', err.message);
      return;
    }
    
    console.log('📋 Colonnes de la table:');
    columns.forEach(col => {
      console.log(`   ✅ ${col.name} (${col.type})`);
    });
    
    // Vérifier les données
    console.log('\n📊 DONNÉES INSÉRÉES:');
    db.all('SELECT * FROM drivers', (err, rows) => {
      if (err) {
        console.error('❌ Erreur lecture données:', err.message);
      } else {
        rows.forEach(row => {
          console.log(`   👤 ${row.name} | 📞 ${row.phone} | 🚗 ${row.car_model} | 🏷️ ${row.plate_number} | 📍 ${row.available ? 'Disponible' : 'Indisponible'}`);
        });
        
        // Test final de l'API
        console.log('\n🧪 TEST FINAL DE L\'API:');
        testAPIRoute();
      }
    });
  });
}

function testAPIRoute() {
  const sql = `
    SELECT 
      id, 
      name, 
      phone, 
      car_model, 
      plate_number, 
      location_lat as latitude, 
      location_lng as longitude 
    FROM drivers 
    WHERE available = 1 
    LIMIT 1
  `;
  
  db.get(sql, [], (err, row) => {
    if (err) {
      console.error('❌ Erreur test API:', err.message);
    } else if (row) {
      console.log('✅ TEST API RÉUSSI!');
      console.log('📦 Données retournées:');
      console.log(JSON.stringify({ driver: { ...row, rating: 4.5 } }, null, 2));
      
      console.log('\n🎉 LA TABLE DRIVERS EST MAINTENANT PRÊTE!');
      console.log('🔄 Redémarrez votre serveur: node server.js');
      console.log('🌐 Testez: http://192.168.1.43:5000/api/drivers/available');
    } else {
      console.log('⚠️  Aucun chauffeur disponible trouvé');
    }
  });
}