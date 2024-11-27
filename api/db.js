// Charger dotenv pour accéder aux variables d'environnement
import dotenv from 'dotenv';
dotenv.config();

import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: process.env.DB_KEY,
  database:"blog"
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
