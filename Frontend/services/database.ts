// services/database.ts - VERSION FINALE TESTÉE
import * as SQLite from 'expo-sqlite';

// Ouvrir la base de données
const db = SQLite.openDatabaseSync('menni.db');

// Initialisation de la base de données
export const initDatabase = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // Utilisation de runAsync qui est plus fiable
    db.runAsync(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      []
    ).then(() => {
      console.log('✅ Table users créée avec succès');
      resolve(true);
    }).catch((error: any) => {
      console.log('❌ Erreur création table:', error);
      reject(error);
    });
  });
};

// Inscription utilisateur
export const registerUser = (
  name: string, 
  email: string, 
  phone: string, 
  password: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.runAsync(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name, email, phone, password]
    ).then(() => {
      console.log('✅ Utilisateur inscrit avec succès');
      resolve(true);
    }).catch((error: any) => {
      console.log('❌ Erreur inscription:', error);
      
      if (error.message?.includes('UNIQUE constraint failed')) {
        if (error.message.includes('email')) {
          reject(new Error('Cette adresse email est déjà utilisée'));
        } else if (error.message.includes('phone')) {
          reject(new Error('Ce numéro de téléphone est déjà utilisé'));
        }
      } else {
        reject(new Error("Erreur lors de l'inscription"));
      }
    });
  });
};

// Connexion utilisateur
export const loginUser = (identifier: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.getAllAsync<any>(
      'SELECT * FROM users WHERE email = ? OR phone = ?',
      [identifier, identifier]
    ).then((users) => {
      if (users && users.length > 0) {
        console.log('✅ Utilisateur trouvé:', users[0].email);
        resolve(users[0]);
      } else {
        reject(new Error('Aucun compte trouvé avec ces informations'));
      }
    }).catch((error: any) => {
      console.log('❌ Erreur connexion:', error);
      reject(new Error('Erreur de connexion'));
    });
  });
};

// Vérifier si un email existe
export const checkEmailExists = (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.getAllAsync<any>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    ).then((results) => {
      resolve(results && results.length > 0);
    }).catch((error: any) => {
      console.log('❌ Erreur vérification email:', error);
      reject(error);
    });
  });
};

// Vérifier si un téléphone existe
export const checkPhoneExists = (phone: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.getAllAsync<any>(
      'SELECT id FROM users WHERE phone = ?',
      [phone]
    ).then((results) => {
      resolve(results && results.length > 0);
    }).catch((error: any) => {
      console.log('❌ Erreur vérification téléphone:', error);
      reject(error);
    });
  });
};

// Récupérer tous les utilisateurs (pour debug)
export const getAllUsers = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.getAllAsync<any>('SELECT * FROM users', []).then((users) => {
      console.log('👥 Utilisateurs dans la base:', users);
      resolve(users || []);
    }).catch((error: any) => {
      console.log('❌ Erreur récupération utilisateurs:', error);
      reject(error);
    });
  });
};

export default db;