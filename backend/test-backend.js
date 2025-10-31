const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testBackend() {
  try {
    console.log('🧪 Test du backend...');
    
    // Test 1: Vérification des utilisateurs
    const usersResponse = await axios.get(`${API_BASE}/auth/debug/users`);
    console.log('✅ Utilisateurs dans la base:', usersResponse.data);
    
    // Test 2: Vérification check-user
    const checkResponse = await axios.post(`${API_BASE}/auth/check-user`, {
      identifier: 'test@example.com'
    });
    console.log('✅ Check-user fonctionne:', checkResponse.data);
    
    console.log('🎉 Backend fonctionne correctement!');
    
  } catch (error) {
    console.error('❌ Erreur test backend:', error.message);
    console.log('💡 Vérifiez que:');
    console.log('   • Le serveur est démarré: node server.js');
    console.log('   • La base de données est initialisée');
    console.log('   • Le port 5000 est accessible');
  }
}

testBackend();