// Charger dotenv pour accéder aux variables d'environnement
require('dotenv').config();

import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: process.env.DB_KEY,
  database:"blog"
})