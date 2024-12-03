// Charger dotenv pour accéder aux variables d'environnement
import dotenv from 'dotenv';
dotenv.config();

import mysql from "mysql"

export const db = mysql.createConnection({
  host: process.env.DB_HOST, // L'adresse de votre base de données sur Render
  user: process.env.DB_USER, // Votre nom d'utilisateur pour la base de données
  password: process.env.DB_PASSWORD, // Votre mot de passe pour la base de données
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT,

})
// Vérifier si la connexion est réussie
db.connect((err) => {
  if (err) {
      console.error('Erreur de connexion à la base de données:', err.stack);
      return;
  }
  console.log('Connecté à la base de données MySQL avec l\'ID', db.threadId);
});

export default db;